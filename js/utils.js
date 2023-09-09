function collision(o1, o2) {
	return (
		o1.position.y + o1.height >= o2.position.y &&
		o1.position.y <= o2.position.y + o2.height &&
		o1.position.x <= o2.position.x + o2.width &&
		o1.position.x + o1.width >= o2.position.x
	);
}

function platformCollision(o1, o2) {
	return (
		o1.position.y + o1.height >= o2.position.y &&
		o1.position.y + o1.height <= o2.position.y + o2.height &&
		o1.position.x <= o2.position.x + o2.width &&
		o1.position.x + o1.width >= o2.position.x
	);
}
