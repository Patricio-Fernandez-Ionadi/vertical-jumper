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
					height: 4,
				})
			);
		}
	});
});

const gravity = 0.1;

const player = new Player({
	position: {
		x: 100,
		y: 350,
	},
	collisionBlocks,
	collisionPlatforms,
	imageSrc: "./img/warrior/Idle.png",
	frameRate: 8,
	animations: {
		Idle: {
			imageSrc: "./img/warrior/Idle.png",
			frameRate: 8,
			frameBuffer: 3,
		},
		IdleLeft: {
			imageSrc: "./img/warrior/IdleLeft.png",
			frameRate: 8,
			frameBuffer: 3,
		},
		Run: {
			imageSrc: "./img/warrior/Run.png",
			frameRate: 8,
			frameBuffer: 5,
		},
		RunLeft: {
			imageSrc: "./img/warrior/RunLeft.png",
			frameRate: 8,
			frameBuffer: 5,
		},
		Jump: {
			imageSrc: "./img/warrior/Jump.png",
			frameRate: 2,
			frameBuffer: 3,
		},
		JumpLeft: {
			imageSrc: "./img/warrior/JumpLeft.png",
			frameRate: 2,
			frameBuffer: 3,
		},
		Fall: {
			imageSrc: "./img/warrior/Fall.png",
			frameRate: 2,
			frameBuffer: 3,
		},
		FallLeft: {
			imageSrc: "./img/warrior/FallLeft.png",
			frameRate: 2,
			frameBuffer: 3,
		},
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

	player.update();
	player.velocity.x = 0;
	if (keys.d.pressed) {
		player.lastDirection = "right";
		player.switchSprites("Run");
		player.velocity.x = 2;
	} else if (keys.a.pressed) {
		player.lastDirection = "left";
		player.velocity.x = -2;
		player.switchSprites("RunLeft");
	} else if (player.velocity.y === 0) {
		if (player.lastDirection === "right") player.switchSprites("Idle");
		else player.switchSprites("IdleLeft");
	}

	if (player.velocity.y < 0) {
		if (player.lastDirection === "right") player.switchSprites("Jump");
		else player.switchSprites("JumpLeft");
	} else if (player.velocity.y > 0) {
		if (player.lastDirection === "right") player.switchSprites("Fall");
		else player.switchSprites("FallLeft");
	}
	c.restore();
}

animate();

window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "d":
			keys.d.pressed = true;
			break;
		case "a":
			keys.a.pressed = true;
			break;
		case "w":
			player.velocity.y = -4;
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
