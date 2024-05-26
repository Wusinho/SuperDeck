import consumer from "channels/consumer";

export default class GameActionSocketHandler {
	constructor(scene) {
		this.scene = scene;
		this.gameActionsChannel = consumer.subscriptions.create(
			{
				channel: 'GameActionsChannel',
			},
			{
				connected: this.onConnected.bind(this),
				disconnected: this.onDisconnected.bind(this),
				received: this.onReceived.bind(this),
			}
		)
	}

	onConnected() {
		console.log("Connected to GameActionsChannel");
		this.gameActionsChannel.perform('connected');
		this.scene.events.emit("gameActionsConnected");
	}

	onDisconnected() {
		console.log("Disconnected from GameActionsChannel");
	}

	onReceived(data) {
		this.scene.events.emit("gameActionsReceived", data);
	}

	send(data) {
		this.gameActionsChannel.perform(data.action, data.param);
	}
}