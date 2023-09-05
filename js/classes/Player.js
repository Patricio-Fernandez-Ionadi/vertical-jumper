class Player {
	constructor({ position, collisionBlocks }) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.width = 25;
		this.height = 25;
		this.collisionBlocks = collisionBlocks;
	}

	draw() {
		c.fillStyle = "red";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();

		this.position.x += this.velocity.x;
		this.checkForHorizontalCollisions();
		this.applyGravity();
		this.checkForVerticalCollisions();
	}

	checkForHorizontalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionblock = this.collisionBlocks[i];

			if (collision(this, collisionblock)) {
				if (this.velocity.x > 0) {
					this.velocity.x = 0;
					this.position.x = collisionblock.position.x - this.width - 0.01;
					break;
				}

				if (this.velocity.x < 0) {
					this.velocity.x = 0;
					this.position.x =
						collisionblock.position.x + collisionblock.width + 0.01;
					break;
				}
			}
		}
	}

	applyGravity() {
		this.position.y += this.velocity.y;
		this.velocity.y += gravity;
	}

	checkForVerticalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionblock = this.collisionBlocks[i];

			if (collision(this, collisionblock)) {
				if (this.velocity.y > 0) {
					this.velocity.y = 0;
					this.position.y = collisionblock.position.y - this.height - 0.01;
					break;
				}

				if (this.velocity.y < 0) {
					this.velocity.y = 0;
					this.position.y =
						collisionblock.position.y + collisionblock.height + 0.01;
					break;
				}
			}
		}
	}
}
