import consumer from "channels/consumer";

export default class SocketHandler {
	constructor(scene) {
		this.scene = scene;
		this.gameChannel = consumer.subscriptions.create(
			{
				channel: "GameChannel",
				game_id: scene.gameId,
			},
			{
				connected: this.onConnected.bind(this),
				disconnected: this.onDisconnected.bind(this),
				received: this.onReceived.bind(this),
			}
		);
	}

	onConnected() {
		console.log("Connected to GameChannel");
		this.scene.events.emit("socketConnected");
	}

	onDisconnected() {
		console.log("Disconnected from GameChannel");
	}

	onReceived(data) {
		console.log("Data received:", data);
		this.scene.events.emit("socketReceived", data);
	}

	send(data) {
		this.gameChannel.perform(data.action, data.param);
	}
}
