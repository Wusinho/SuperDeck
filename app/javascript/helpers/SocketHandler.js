export default class SocketHandler {
	constructor(scene) {

		scene.socket = {}

		scene.socket.on('connect', () => {
			console.log('Connected!');
			// scene.socket.emit('dealDeck', scene.socket.id);
		});

		scene.on('firstTurn', ()=> {
			console.log('firstTurn turn')
			scene.GameHandler.changeGameState();
		})

		scene.on('changeGameState', (gameState) => {
			scene.GameHandler.changeGameState(gameState);
			if ( gameState === 'Initializing') {
				scene.DeckHandler.dealCard(1000, 860, 'cardBack','playerCard')
				scene.DeckHandler.dealCard(1000, 135, 'cardBack','opponentCard')
				scene.dealCards.setInteractive();
				scene.dealCards.setColor('#00ffff')
			}
		})

		scene.on('dealCards', (cards, socketId) => {
			console.log(cards);

			// make if stattement whos turn it is

			// arranging cards one next to the other


			// if (socketId === scene.socket.id){
			// 	for (let i in cards) {
			// 		let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 860, cards[i], 'playerCard'));
			//
			// 	}
			// } else {
			// 	for (let i in cards) {
			// 		let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 135, 'cardBack','opponentCard'));
			// 	}
			// }

		})

		scene.on('cardPlayed', (cardName, socketId) => {
			console.log(cardName)

			if (socketId === scene.socket.id) {
				scene.GameHandler.opponentHand.shift().destroy();
				scene.DeckHandler.dealCard(scene.dropZone.x, scene.dropZone.y, cardName, 'opponentCard');
			} else {

			}
		})
	}
}