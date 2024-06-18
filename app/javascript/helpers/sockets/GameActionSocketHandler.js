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
		this.scene.events.emit("gameActionsConnected");
	}

	onDisconnected() {
	}

	onReceived(data) {
		if (data[0] === 'own_zone') {
			this.scene.events.emit("gameActionsReceived", data[1]);
		} else {
			this.scene.events.emit("acrossPlayersActionsReceived", data[1]);
		}

	}

	send(data) {
		this.gameActionsChannel.perform(data.action, data.param);
	}
}