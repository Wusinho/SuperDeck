import consumer from "channels/consumer";

export default class DrawCardSocketHandler {
	constructor(scene) {
		this.scene = scene;
		this.drawCardChannel = consumer.subscriptions.create(
			{
				channel: "DrawCardChannel",
			},
			{
				connected: this.onConnected.bind(this),
				disconnected: this.onDisconnected.bind(this),
				received: this.onReceived.bind(this),
			}
		);
	}

	onConnected() {
		console.log("Connected to DrawCardChannel");
		this.scene.events.emit("drawCardConnected");
	}

	onDisconnected() {
		console.log("Disconnected from DrawCardChannel");
	}

	onReceived(data) {
		this.scene.events.emit("drawCardReceived", data);
	}

	send(data) {
		this.drawCardChannel.perform(data.action, data.param);
	}
}
