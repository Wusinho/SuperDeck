
export default class CardManager {
	constructor(scene) {
		this.scene = scene;
		this.setupContextMenuListeners(); // Setup context menu event listeners
		this.createCurrentUserCard = this.createCurrentUserCard.bind(this);
		this.createVerticalOpponentCard = this.createVerticalOpponentCard.bind(this);
		this.createHorizontalOpponentCard = this.createHorizontalOpponentCard.bind(this);
	}

	createVerticalOpponentCard = (scene, x, y, i, spriteKey = 'defaultOpponentSprite', cardName = '' ) => {
		let value = 125 + (x * i) + (50)

		const card = scene.add.sprite(value, y, spriteKey).setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;
	}

	createHorizontalOpponentCard = (scene, x, y, i, spriteKey = 'defaultOpponentSprite', cardName = '' ) => {
		let value = 125 + (x * i) + (50)

		const card = scene.add.sprite(value, y, spriteKey).setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;
		card.angle = 90;
	}

	createCurrentUserCard(x, y, i, spriteKey = 'defaultCardSprite', cardName = '') {
		let value = 125 + (x * i) + 50;

		// Create the card sprite
		const card = this.scene.add.sprite(value, y, spriteKey).setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;

		console.log(`Card created: ${cardName}, at position (${value}, ${y})`);

		// Event listener for left button down
		card.on('pointerdown', (pointer) => {
			if (pointer.rightButtonDown()) {
				console.log('Right button down on card:', cardName);

				// Show context menu
				const contextMenu = document.getElementById('context-menu');
				contextMenu.style.display = 'block';
				contextMenu.style.left = `${pointer.event.clientX}px`;
				contextMenu.style.top = `${pointer.event.clientY}px`;

				// Store card reference for menu actions
				contextMenu.card = card;

				// Auto-hide context menu after 2 seconds
				setTimeout(() => {
					contextMenu.style.display = 'none';
				}, 4000);
			} else if (pointer.leftButtonDown()) {
				// Rotate the card 90 degrees on left click
				card.angle += 90;
				console.log('Left button down on card, rotating:', cardName);
			}
		});

		return card;
	}

	setupContextMenuListeners() {
		document.getElementById('play-in-mana-pool').addEventListener('click', () => {
			const contextMenu = document.getElementById('context-menu');
			this.scene.Zones.moveToZone(contextMenu.card, 'mana_pool');
			contextMenu.style.display = 'none';
		});

		document.getElementById('play-in-playzone').addEventListener('click', () => {
			const contextMenu = document.getElementById('context-menu');
			this.scene.Zones.moveToZone(contextMenu.card, 'playzone');
			contextMenu.style.display = 'none';
		});

		document.getElementById('play-in-playzone-morph').addEventListener('click', () => {
			const contextMenu = document.getElementById('context-menu');
			this.scene.Zones.moveToZone(contextMenu.card, 'playzone');
			contextMenu.style.display = 'none';
		});

		document.getElementById('play-in-graveyard').addEventListener('click', () => {
			const contextMenu = document.getElementById('context-menu');
			this.scene.Zones.moveToZone(contextMenu.card, 'graveyard');
			contextMenu.style.display = 'none';
		});

		document.getElementById('play-in-hand').addEventListener('click', () => {
			const contextMenu = document.getElementById('context-menu');
			this.scene.Zones.moveToZone(contextMenu.card, 'hand');
			contextMenu.style.display = 'none';
		});

	}
}
