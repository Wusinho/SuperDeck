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
		this.scene.events.emit("drawCardConnected");
	}

	onDisconnected() {
	}

	onReceived(data) {
		this.scene.events.emit("drawCardReceived", data);
	}

	send(data) {
		this.drawCardChannel.perform(data.action, data.param);
	}
}
