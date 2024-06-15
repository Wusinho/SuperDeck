import consumer from "channels/consumer";

export default class SpecialActionSocketHandler {
	constructor(scene) {
		this.scene = scene;
		this.specialActionsChannel = consumer.subscriptions.create(
			{
				channel: 'SpecialActionsChannel'
			},
			{
				connected: this.onConnected.bind(this),
				disconnected: this.onDisconnected.bind(this),
				received: this.onReceived.bind(this),
			}
		)
	}

	onConnected(){
		this.scene.events.emit("specialActionsConnected");
	}

	onDisconnected(){
	}

	onReceived(data){
		this.scene.events.emit("specialActionsReceived", data);
	}

	send(data) {
		this.specialActionsChannel.perform(data.action, data.param);
	}



}