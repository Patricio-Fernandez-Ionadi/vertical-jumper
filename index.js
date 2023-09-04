const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
	width: canvas.width / 4,
	height: canvas.height / 4,
};

const gravity = 0.5;

class Sprite {
	constructor({ position, imageSrc }) {
		this.position = position;
		this.image = new Image();
		this.image.src = imageSrc;
	}
	draw() {
		if (!this.image) return;
		c.drawImage(this.image, this.position.x, this.position.y);
	}

	update() {
		this.draw();
	}
}

class Player {
	constructor({ position }) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.height = 100;
	}

	draw() {
		c.fillStyle = "red";
		c.fillRect(this.position.x, this.position.y, 100, this.height);
	}

	update() {
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		if (this.position.y + this.height + this.velocity.y < canvas.height)
			this.velocity.y += gravity;
		else this.velocity.y = 0;
	}
}

const player = new Player({
	position: {
		x: 0,
		y: 0,
	},
});

const keys = {
	d: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	w: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
};

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: "./img/background.png",
});

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = "white";
	c.fillRect(0, 0, canvas.width, canvas.height);

	c.save();
	c.scale(4, 4);
	c.translate(0, -background.image.height + scaledCanvas.height);
	background.update();
	c.restore();

	player.update();
	player.velocity.x = 0;
	if (keys.d.pressed) player.velocity.x = 1;
	else if (keys.a.pressed) player.velocity.x = -1;
}

animate();

window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "d":
			keys.d.pressed = true;
			// player.velocity.x = 1;
			break;
		case "a":
			keys.a.pressed = true;
			// player.velocity.x = -1;
			break;
		case "w":
			player.velocity.y = -20;
			break;
	}
});

window.addEventListener("keyup", (e) => {
	switch (e.key) {
		case "d":
			keys.d.pressed = false;
			// player.velocity.x = 0;
			break;
		case "a":
			keys.a.pressed = false;
			// player.velocity.x = 0;
			break;
	}
});
