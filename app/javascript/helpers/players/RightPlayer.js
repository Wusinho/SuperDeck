import Player from './Player';
export default class RightPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.createUserName()
		this.hand_size = {
			width: 150,
			height: 200,
		}
		this.other_zones = {
			width: 100,
			height: 100,
		}
		this.addHandCardsToGame(player.cards.hand)
		this.addManaPoolCardsToGame(player.cards.mana_pool)
		this.addExileCardsToGame(player.cards.exile)
		this.addGraveyardCardsToGame(player.cards.graveyard)
		this.addPlayZoneCardsToGame(player.cards.play_zone)
	}

	createUserName(){
		let centerX = this.scene.rightPlayerUserInfo.x
		let centerY = this.scene.rightPlayerUserInfo.y

		this.scene.currentUserName = this.create_text(centerX,centerY, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		this.scene.angle = 90;
	}

	addHandCardsToGame(data){
		const handSize = data.length
		this.handInformation(handSize);
	}

	handInformation(handSize){
		let centerX = this.scene.rightPlayerHandArea.x
		let centerY = this.scene.rightPlayerHandArea.y

		this.scene.rightUserHandSize = this.create_text(centerX,centerY, `${handSize}`)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		this.scene.angle = 90;
	}

	addManaPoolCardsToGame(data){
		for (let i in data) {
			this.createOpponentCard(data[i])
		}
	}

	addExileCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	addGraveyardCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	addPlayZoneCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}


	getAreaPosition(zone) {
		let area;
		switch (zone) {
			case 'hand':
				area = this.scene.rightPlayerHandArea;
				break;
			case 'mana_pool':
				area = this.scene.rightPlayerManaPoolArea;
				break;
			case 'play_zone':
				area = this.scene.rightPlayerPlayZoneArea;
				break;
			case 'exile':
				area = this.scene.rightPlayerGraveyardArea;
				break;
			case 'graveyard':
				area = this.scene.rightPlayerGraveyardArea;
				break;
			default:
				console.error(`Unknown zone: ${zone}`);
				return { x: 0, y: 0 };
		}

		return { x: area.x, y: area.y, width: area.width };
	}


}