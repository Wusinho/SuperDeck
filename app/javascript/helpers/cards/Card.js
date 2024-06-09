import { PlayerTypes } from "../PlayerTypes";

export default class Card extends Phaser.GameObjects.Sprite {
	constructor(scene, cardData, player_id, initialPosition, initialAngle = 0, playerType, handSize, otherZones) {
		super(scene, initialPosition.x, initialPosition.y, 'defaultCardSprite');
		this.scene = scene;
		this.card_id = cardData.card_id;
		this.zone = cardData.zone;
		this.card_name = cardData.name;
		this.morphed = cardData.morphed || false;
		this.tapped = cardData.tapped || false;
		this.image_url = cardData.image_url;
		this.player_type = playerType;
		this.hand_size = handSize;
		this.other_zones = otherZones;
		this.owner_id = player_id;

		// Set the initial angle
		this.angle = initialAngle;

		// Set interactive
		this.setInteractive();

		// Add to scene
		scene.add.existing(this);

		// Calculate and apply initial scale
		this.setScale(this.calculateScale(handSize, otherZones));

		// Load card image
		this.loadCardTexture();

		// Handle interactions
		this.on('pointerdown', this.handlePointerDown, this);
		this.on('pointerover', this.showCard, this)
	}

	getPlayerCardId(){
		return this.owner_id
	}

	showCard() {
		if (this.scene.LoadGame.players.currentPlayer.player_id === this.getPlayerCardId()) {
			if (this.zone !== 'mana_pool') {
				this.scene.BoardCreation.updateCardViewer({
					title: this.card_name ,
					image_url: this.image_url,
					card_id: this.card_id
				});
			} else {
			}
		} else if (this.zone === 'play_zone' && !this.morphed) {
			this.scene.BoardCreation.updateCardViewer({
				title: this.card_name ,
				image_url: this.image_url,
				card_id: this.card_id
			});
		} else {
		}
	}

	on_hand() {
		return this.zone === 'hand'
	}

	opponent() {
		return this.player_type === 'opponent'
	}

	card_behaviour() {
		if ( this.on_hand() && this.opponent() ){
			this.setVisible(false);
		} else {
			this.setVisible(true);
		}
	}

	loadCardTexture() {
		this.card_behaviour();
		this.scene.load.image(`card-${this.card_id}`, this.image_url);
		this.scene.load.once('complete', () => {
			if (this.zone === 'play_zone' && this.morphed || this.zone === 'mana_pool' ) {
				this.setTexture('defaultCardSprite');
			} else if (this.zone !== 'mana_pool') {
				this.setTexture(`card-${this.card_id}`);
			} else {
				// this.setTexture('defaultCardSprite'); // For `mana_pool`, always set to default sprite
			}
			this.setScale(this.calculateScale(this.handSize, this.otherZones));
		});
		this.scene.load.start();

		if (this.zone === 'mana_pool' || this.zone === 'play_zone') {
			this.angle = this.tappedLogic()
		}
	}

	calculateScale(handSize, otherZones) {
		let desiredWidth, desiredHeight;
		if (this.zone === 'hand') {
			desiredWidth = this.hand_size.width;
			desiredHeight = this.hand_size.height;
		} else {
			desiredWidth = this.other_zones.width;
			desiredHeight = this.other_zones.height;
		}

		// Get the original size of the card
		let originalWidth = this.width;
		let originalHeight = this.height;

		// Calculate the scale factor to maintain the aspect ratio
		return Math.min(desiredWidth / originalWidth, desiredHeight / originalHeight);
	}

	handlePointerDown(pointer) {
		if (this.player_type === PlayerTypes.CURRENT) {
			if (pointer.rightButtonDown()) {
				this.scene.LoadGame.players.currentPlayer.showContextMenu(pointer, this);
			} else if (pointer.leftButtonDown() && this.zone !== 'hand') {
				this.toggleTapped();
			} else {
				console.log("Not Implemented");
			}
		} else if (this.player_type === PlayerTypes.OPPONENT) {
			// Define opponent-specific behavior
			if (pointer.rightButtonDown()) {
				console.log('Richt clicked')
			} else if (pointer.leftButtonDown()) {
				console.log("Opponent card clicked");
			} else {
				console.log("Not Implemented");
			}
		}
	}

	tappedLogic(){
		return this.tapped ? (this.angle + 90) % 360 : (this.angle + 360) % 360;
	}

	toggleTapped() {
		this.scene.GameActions.send({
			action: "change_state",
			param: {
				card_id: this.card_id,
				tapped: !this.tapped,
				morphed: this.morphed,
				zone: this.zone
			}
		});
	}
}