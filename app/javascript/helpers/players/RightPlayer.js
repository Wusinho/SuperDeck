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

	// moveCardToZone(card_id, newZone) {
	// 	for (let zone in this.cards) {
	// 		let cardIndex = this.cards[zone].findIndex(card => card.card_id === card_id);
	// 		if (cardIndex !== -1) {
	// 			let [card] = this.cards[zone].splice(cardIndex, 1);
	// 			card.zone = newZone;
	//
	// 			if (newZone === 'mana_pool') {
	// 				card.setTexture('defaultCardSprite');
	// 			} else {
	// 				this.scene.load.image(`card-${card.card_id}`, card.action.image_url);
	// 				this.scene.load.once('complete', () => {
	// 					card.setTexture(`card-${card.card_id}`);
	// 				});
	// 				this.scene.load.start();
	// 			}
	//
	// 			let scale = this.calculateScale(card, newZone);
	// 			card.setScale(scale);
	// 			this.cards[newZone].push(card);
	//
	// 			this.updateCardPositions(zone);
	// 			this.updateCardPositions(newZone);
	// 			break;
	// 		}
	// 	}
	// }

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
			this.createOpponentCard(data[i])
		}
	}

	addGraveyardCardsToGame(data){
		for (let i in data) {
			this.createOpponentCard(data[i])
		}
	}

	addPlayZoneCardsToGame(data){
		for (let i in data) {
			this.createOpponentCard(data[i])
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