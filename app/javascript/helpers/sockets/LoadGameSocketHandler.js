import consumer from "channels/consumer";

export default class LoadGameSocketHandler {
	constructor(scene) {
		this.scene = scene;
		this.boardChannel = consumer.subscriptions.create(
			{
				channel: "BoardChannel",
			},
			{
				connected: this.onConnected.bind(this),
				disconnected: this.onDisconnected.bind(this),
				received: this.onReceived.bind(this),
			}
		);
	}

	onConnected() {
		console.log("Connected to BoardChannel");
		this.boardChannel.perform('connected');
		this.scene.events.emit("boardConnected");
	}

	onDisconnected() {
		console.log("Disconnected from BoardChannel");
	}

	onReceived(data) {
		this.scene.events.emit("boardReceived", data);
	}

	send(data) {
		this.boardChannel.perform(data.action, data.param);
	}
}
