import { PlayerTypes } from "../PlayerTypes";

export default class Card extends Phaser.GameObjects.Sprite {
	constructor(scene, cardData, initialPosition, scale, handSize, otherZones, initialAngle = 0, playerType) {
		super(scene, initialPosition.x, initialPosition.y, 'defaultCardSprite');
		this.scene = scene;
		this.card_id = cardData.player_card_id;
		this.zone = cardData.zone;
		this.morphed = cardData.morphed || false;
		this.tapped = cardData.tapped || false;
		this.image_url = cardData.image_url;
		this.player_type = playerType;

		// Set the initial angle
		this.angle = initialAngle;

		// Set interactive
		this.setInteractive();

		// Load card image
		this.loadCardTexture();

		// Handle interactions
		this.on('pointerdown', this.handlePointerDown, this);

		// Add to scene
		scene.add.existing(this);

		// Apply initial scale
		this.setScale(scale);

		// Store sizes for scaling
		this.handSize = handSize;
		this.otherZones = otherZones;
	}

	loadCardTexture() {
		this.scene.load.image(`card-${this.card_id}`, this.image_url);
		this.scene.load.once('complete', () => {
			if (this.zone === 'play_zone' && this.morphed || this.zone === 'mana_pool' ) {
				this.setTexture('defaultCardSprite');
			} else if (this.zone !== 'mana_pool') {
				this.setTexture(`card-${this.card_id}`);
			} else {
				console.log('NOT DEFINED');
			}
			this.setScale(this.calculateScale());
		});
		this.scene.load.start();

		if (this.tapped) {
			this.angle = (this.angle + 90) % 360; // Adjust initial angle if tapped
		}
	}

	calculateScale() {
		let desiredWidth, desiredHeight;
		if (this.zone === 'hand') {
			desiredWidth = this.handSize.width;
			desiredHeight = this.handSize.height;
		} else {
			desiredWidth = this.otherZones.width;
			desiredHeight = this.otherZones.height;
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

	toggleTapped() {
		this.tapped = !this.tapped;
		this.angle = this.tapped ? (this.angle + 90) % 360 : (this.angle - 90 + 360) % 360;
		this.scene.GameActions.send({
			action: "change_state",
			param: {
				player_card_id: this.card_id,
				tapped: this.tapped,
				morphed: this.morphed,
				zone: this.zone
			}
		});
	}
}