import consumer from "channels/consumer";

export default class LoadGameSocketHandler {
	constructor(scene) {
		this.scene = scene;
		this.loadGameChannel = consumer.subscriptions.create(
			{
				channel: "LoadGameChannel",
			},
			{
				connected: this.onConnected.bind(this),
				disconnected: this.onDisconnected.bind(this),
				received: this.onReceived.bind(this),
			}
		);
	}

	onConnected() {
		console.log("Connected to LoadGameChannel");
		this.loadGameChannel.perform('connected');
		this.scene.events.emit("loadGameConnected");
	}

	onDisconnected() {
		console.log("Disconnected from loadGameConnected");
	}

	onReceived(data) {
		this.scene.events.emit("loadGameReceived", data);
	}

	send(data) {
		this.loadGameChannel.perform(data.action, data.param);
	}
}
