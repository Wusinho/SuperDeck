import Phaser from "phaser";

export default class Example extends Phaser.Scene {
	constructor() {
		super("example"); // Give a name to the scene
		this.logo = null; // Define player as a class property
	}

	preload() {
		this.load.setBaseURL("https://labs.phaser.io");

		this.load.image("sky", "assets/skies/space3.png");
		this.load.image("logo", "assets/sprites/phaser3-logo.png");
		this.load.image("red", "assets/particles/red.png");
	}

	create() {
		this.add.image(400, 300, "sky");

		const particles = this.add.particles(0, 0, "red", {
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: "ADD",
		});

		this.logo = this.physics.add.image(400, 100, "logo");

		this.logo.setVelocity(100, 200);
		this.logo.setBounce(1, 1);
		this.logo.setCollideWorldBounds(true);
		//
		particles.startFollow(this.player);
	}

	update(time) {
		// this method send a direct messa to game_channel method receive
		// gameChannel.send({ action: "receive", data: '12345' });

	}

}
