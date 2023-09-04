const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
	width: canvas.width / 4,
	height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let y = 0; y < floorCollisions.length; y += 36) {
	floorCollisions2D.push(floorCollisions.slice(y, y + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, rowIndex) => {
	row.forEach((symbol, columnIndex) => {
		if (symbol === 202) {
			collisionBlocks.push(
				new CollisionBlock({
					position: {
						x: columnIndex * 16,
						y: rowIndex * 16,
					},
				})
			);
		}
	});
});
const platformCollisions2D = [];
for (let y = 0; y < floorCollisions.length; y += 36) {
	platformCollisions2D.push(platformCollisions.slice(y, y + 36));
}

const collisionPlatforms = [];
platformCollisions2D.forEach((row, rowIndex) => {
	row.forEach((symbol, columnIndex) => {
		if (symbol === 202) {
			collisionPlatforms.push(
				new CollisionBlock({
					position: {
						x: columnIndex * 16,
						y: rowIndex * 16,
					},
				})
			);
		}
	});
});

const gravity = 0.5;

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
	collisionBlocks.forEach((collb) => {
		collb.update();
	});
	collisionPlatforms.forEach((platform) => {
		platform.update();
	});
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
