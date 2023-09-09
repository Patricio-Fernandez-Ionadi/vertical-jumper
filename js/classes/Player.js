class Player extends Sprite {
	constructor({
		position,
		collisionBlocks,
		collisionPlatforms,
		imageSrc,
		frameRate,
		scale = 0.5,
		animations,
	}) {
		super({ imageSrc, frameRate, scale });
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.width = 25;
		this.height = 25;
		this.collisionPlatforms = collisionPlatforms;
		this.collisionBlocks = collisionBlocks;
		this.hitbox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: 10,
			height: 10,
		};

		this.animations = animations;
		this.lastDirection = "right";

		for (let key in this.animations) {
			const image = new Image();
			image.src = this.animations[key].imageSrc;

			this.animations[key].image = image;
		}

		this.cameraBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: 200,
			height: 80,
		};
	}

	switchSprites(key) {
		if (this.image === this.animations[key].image || !this.loaded) return;

		this.currentFrame = 0;
		this.image = this.animations[key].image;
		this.frameBuffer = this.animations[key].frameBuffer;
		this.frameRate = this.animations[key].frameRate;
	}

	updateCameraBox() {
		this.cameraBox = {
			position: {
				x: this.position.x - 50,
				y: this.position.y,
			},
			width: 200,
			height: 80,
		};
	}

	checkForHorizontalCanvasCollision() {
		if (
			this.hitbox.position.x + this.hitbox.width + this.velocity.y + 5 >= 576 ||
			this.hitbox.position.x + this.velocity.x <= 0
		) {
			this.velocity.x = 0;
		}
	}

	shouldPanCameraToTheLeft({ canvas, camera }) {
		const cameraboxRightSide = this.cameraBox.position.x + this.cameraBox.width;
		const scaledCanvas = canvas.width / 4;

		if (cameraboxRightSide >= 576) return;

		if (cameraboxRightSide >= scaledCanvas + Math.abs(camera.position.x)) {
			camera.position.x -= this.velocity.x;
		}
	}
	shouldPanCameraToTheRight({ camera }) {
		if (this.cameraBox.position.x <= 0) return;

		if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
			camera.position.x -= this.velocity.x;
		}
	}
	shouldPanCameraDown({ camera }) {
		if (this.cameraBox.position.y + this.velocity.y <= 0) return;

		if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
			camera.position.y -= this.velocity.y;
		}
	}
	shouldPanCameraUp({ canvas, camera }) {
		if (
			this.cameraBox.position.y + this.cameraBox.height + this.velocity.y >=
			432
		)
			return;

		const scaledCanvas = canvas.height / 4;

		if (
			this.cameraBox.position.y + this.cameraBox.height >=
			Math.abs(camera.position.y) + scaledCanvas
		) {
			camera.position.y -= this.velocity.y;
		}
	}

	update() {
		this.updateFrames();
		this.updateHitbox();

		this.updateCameraBox();
		// draws camera box
		// c.fillStyle = "rgba(0, 0, 255, 0.2)";
		// c.fillRect(
		// 	this.cameraBox.position.x,
		// 	this.cameraBox.position.y,
		// 	this.cameraBox.width,
		// 	this.cameraBox.height
		// );

		// draws out the image
		// c.fillStyle = "rgba(0, 255, 0, 0.2)";
		// c.fillRect(this.position.x, this.position.y, this.width, this.height);

		// draws out the hitbox
		// c.fillStyle = "rgba(255, 0, 0, 0.2)";
		// c.fillRect(
		// 	this.hitbox.position.x,
		// 	this.hitbox.position.y,
		// 	this.hitbox.width,
		// 	this.hitbox.height
		// );

		this.draw();

		this.position.x += this.velocity.x;
		this.updateHitbox();
		this.checkForHorizontalCollisions();
		this.applyGravity();
		this.updateHitbox();
		this.checkForVerticalCollisions();
	}

	updateHitbox() {
		this.hitbox = {
			position: {
				x: this.position.x + 35,
				y: this.position.y + 25,
			},
			width: 13,
			height: 28,
		};
	}

	checkForHorizontalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionblock = this.collisionBlocks[i];

			if (collision(this.hitbox, collisionblock)) {
				if (this.velocity.x > 0) {
					this.velocity.x = 0;

					const offset =
						this.hitbox.position.x - this.position.x + this.hitbox.width;

					this.position.x = collisionblock.position.x - offset - 0.01;
					break;
				}

				if (this.velocity.x < 0) {
					this.velocity.x = 0;

					const offset = this.hitbox.position.x - this.position.x;

					this.position.x =
						collisionblock.position.x + collisionblock.width - offset + 0.01;
					break;
				}
			}
		}
	}

	applyGravity() {
		this.velocity.y += gravity;
		this.position.y += this.velocity.y;
	}

	checkForVerticalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionblock = this.collisionBlocks[i];

			if (collision(this.hitbox, collisionblock)) {
				if (this.velocity.y > 0) {
					this.velocity.y = 0;

					const offset =
						this.hitbox.position.y - this.position.y + this.hitbox.height;

					this.position.y = collisionblock.position.y - offset - 0.01;
					break;
				}

				if (this.velocity.y < 0) {
					this.velocity.y = 0;

					const offset = this.hitbox.position.y - this.position.y;

					this.position.y =
						collisionblock.position.y + collisionblock.height - offset + 0.01;
					break;
				}
			}
		}
		// platform collision
		for (let i = 0; i < this.collisionPlatforms.length; i++) {
			const platformCollisions = this.collisionPlatforms[i];

			if (platformCollision(this.hitbox, platformCollisions)) {
				if (this.velocity.y > 0) {
					this.velocity.y = 0;

					const offset =
						this.hitbox.position.y - this.position.y + this.hitbox.height;

					this.position.y = platformCollisions.position.y - offset - 0.01;
					break;
				}
			}
		}
	}
}
