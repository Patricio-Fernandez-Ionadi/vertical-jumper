const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

function animate() {
	window.requestAnimationFrame(animate);
}

animate();