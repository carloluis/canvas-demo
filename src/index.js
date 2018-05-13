import './index.scss';

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const mouse = { x: undefined, y: undefined };

const MAX_RADIUS = 40;
const DISTANCE = 40;

window.addEventListener('resize', event => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

window.addEventListener('mousemove', event => {
	const { x, y } = event;
	mouse.x = x;
	mouse.y = y;
});

window.addEventListener('mouseout', () => {
	mouse.x = mouse.y = undefined;
});

function getRandomColor() {
	const colors = [
		'#2E112D',
		'#540032',
		'#820333',
		'#C9283E',
		'#F0433A'
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = getRandomColor();
	this.bgColor = getRandomColor();
	const MIN_RADIUS = radius;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.stroke();
		c.fillStyle = this.bgColor;
		c.fill();
		c.closePath();
	};

	this.update = function () {
		const { x, y, radius } = this;

		if (x + radius > innerWidth || x - radius < 0) {
			this.dx *= -1;
		}
		if (y + radius > innerHeight || y - radius < 0) {
			this.dy *= -1;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (radius < MAX_RADIUS && Math.abs(mouse.x - this.x) < DISTANCE && Math.abs(mouse.y - this.y) < DISTANCE) {
			this.radius += 1;
		} else if (radius > MIN_RADIUS) {
			this.radius -= 1;
		}

		this.draw();
	};
}

let circles = [];
const CIRCLES = 1000;
const velocity = 1;

function init() {
	circles = [];

	for (let i = 0; i < CIRCLES; i++) {
		const radius = 1 + Math.random() * 4;
		const x = Math.random() * (innerWidth - 2 * radius) + radius;
		const y = Math.random() * (innerHeight - 2 * radius) + radius;
		const dx = (Math.random() - 0.5) * velocity;
		const dy = (Math.random() - 0.5) * velocity;
		const circle = new Circle(x, y, dx, dy, radius);
		circles.push(circle);
	}

	animate();
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < circles.length; i++) {
		circles[i].update();
	}
}

init();
