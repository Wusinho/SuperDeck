const createCurrentUserCard = (scene, x, y, i, spriteKey = 'defaultCardSprite', cardName = '', moveToZone) => {
	let value = 125 + (x * i) + 50;

	// Create the card sprite
	const card = scene.add.sprite(value, y, spriteKey).setInteractive();

	card.displayWidth = 100;
	card.displayHeight = 240;

	console.log(`Card created: ${cardName}, at position (${value}, ${y})`);

	let clickTimeout = null;

	// Event listener for left button down
	card.on('pointerdown', (pointer) => {
		if (pointer.leftButtonDown()) {
			console.log('Left button down on card:', cardName);

			if (clickTimeout) {
				// Double-click detected
				clearTimeout(clickTimeout);
				clickTimeout = null;
				card.angle += 90; // Rotate the card by 90 degrees
				console.log('Double-click detected, rotating card');
			} else {
				// Single-click detected, set timeout for double-click detection
				clickTimeout = setTimeout(() => {
					clickTimeout = null;
					// Move card to mana_pool (or playzone if needed)
					moveToZone(card, 'mana_pool'); // Change 'mana_pool' to 'playzone' if needed
					console.log('Single-click detected, moving card to mana_pool');
				}, 300); // 300ms timeout for double-click detection
			}
		}
	});

	// Event listener for right button down
	card.on('pointerdown', (pointer) => {
		if (pointer.rightButtonDown()) {
			console.log('Right button down on card:', cardName);
			moveToZone(card, 'mana_pool'); // Change 'mana_pool' to 'playzone' if needed
		}
	});

	// Additional log to verify event listener binding
	card.on('pointerover', () => {
		console.log('Pointer over card:', cardName);
	});

	return card;
};

const createVerticalOpponentCard = (scene, x, y, i, spriteKey = 'defaultOpponentSprite', cardName = '' ) => {
	let value = 125 + (x * i) + (50)

	const card = scene.add.sprite(value, y, spriteKey).setInteractive();

	card.displayWidth = 100;
	card.displayHeight = 240;
}

const createHorizontalOpponentCard = (scene, x, y, i, spriteKey = 'defaultOpponentSprite', cardName = '' ) => {
	let value = 125 + (x * i) + (50)

	const card = scene.add.sprite(value, y, spriteKey).setInteractive();

	card.displayWidth = 100;
	card.displayHeight = 240;
}

export {
	createCurrentUserCard,
	createVerticalOpponentCard,
	createHorizontalOpponentCard
};


