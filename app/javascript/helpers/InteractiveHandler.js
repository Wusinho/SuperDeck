export default class InteractiveHandler {
	constructor(scene) {
		// requet to server
		scene.dealCards.on('pointerDown', () => {
			scene.socket.emit('dealCards', scene.socket.id);
			scene.dealCards.disableInteractive();
		})

		scene.dealCards.on('pointerover', () => {
			scene.dealCards.setColor('#ff69b4');
		})

		scene.dealCards.on('pointerout', () => {
			scene.dealCards.setColor('#00ffff');
		})

		scene.input.on('dragstart', (pointer, gameObject) => {
			gameObject.setTint(0xff69b4);
			sence.children.bringToTop(gameObject);
		})

		// dragend? or dragover?
		scene.input.on('dragend', (pointer, gameObject, dropped) => {
			gameObject.setTint();

			// if its not in the dropp zone send it where it started
			if (!dropped) {
				gameObject.x = gameObject.input.dragStartX;
				gameObject.y = gameObject.input.dragStartY;
			}
		})

		// cant drop em unless its my turn and game state is ready
		scene.input.on('drop', (pointer, gameObject, dropZone) => {
			if (scene.LoadGame.isMyTurn && scene.LoadGame.gameState === 'Ready') {
				gameObject.x = dropZone.x;
				gameObject.y = dropZone.y;
				scene.input.setDraggable(gameObject, false);
				scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
			} else {
				gameObject.x = gameObject.input.dragStartX;
				gameObject.y = gameObject.input.dragStartY;
			}
		})
	}
}