const createCurrentUserCard = (scene, x, y, i, spriteKey = 'defaultCardSprite', cardName = '', moveToZone) => {
	let value = 125 + (x * i) + 50;

	// Create the card sprite
	const card = scene.add.sprite(value, y, spriteKey).setInteractive();

	card.displayWidth = 100;
	card.displayHeight = 240;

	console.log(`Card created: ${cardName}, at position (${value}, ${y})`);

	// Create a DOM element for the context menu
	const contextMenu = document.getElementById('context-menu');

	// Event listener for left button down
	card.on('pointerdown', (pointer) => {
		if (pointer.leftButtonDown()) {
			console.log('Left button down on card:', cardName);

			contextMenu.style.display = 'block';
			contextMenu.style.left = `${pointer.event.clientX}px`;
			contextMenu.style.top = `${pointer.event.clientY}px`;
			contextMenu.style.zIndex = '10000';

			contextMenu.card = card;
		}
	});

	return card;
};

const moveToZone = (card, zone, angle = 0) => {
	if (zone === 'mana_pool') {
		card.x = card.scene.currentManaPool.x;
		card.y = card.scene.currentManaPool.y;
		card.angle = angle;
		console.log('Card moved to mana_pool');
	} else if (zone === 'playzone') {
		card.x = card.scene.currentUserPlayzone.x;
		card.y = card.scene.currentUserPlayzone.y;
		card.angle = angle;
		console.log('Card moved to playzone');
	}
};

// Add event listeners for context menu options
document.getElementById('play-in-mana-pool').addEventListener('click', () => {
	const contextMenu = document.getElementById('context-menu');
	moveToZone(contextMenu.card, 'mana_pool');
	contextMenu.style.display = 'none';
});

document.getElementById('play-in-playzone').addEventListener('click', () => {
	const contextMenu = document.getElementById('context-menu');
	moveToZone(contextMenu.card, 'playzone');
	contextMenu.style.display = 'none';
});

document.getElementById('play-in-playzone-flipped').addEventListener('click', () => {
	const contextMenu = document.getElementById('context-menu');
	moveToZone(contextMenu.card, 'playzone', 90);
	contextMenu.style.display = 'none';
});


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


