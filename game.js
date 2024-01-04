class Target {
    vx = 0;
    vy = 0;
    radius = 1;
    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    tick(Fx, Fy, delta_t) {
        this.x += this.vx * delta_t;
        this.y += this.vy * delta_t;
        this.vx += Fx * delta_t;
        this.vy += Fy * delta_t;
    }
}

// Get the canvas element
var canvas = document.getElementById('myCanvas');

// Get the 2D rendering context
var context = canvas.getContext('2d');

function uniform() {
    return Math.floor(Math.random() * 3) - 1;
}

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawTarget(target, color) {
    // position mapping
    const mx = ((target.x + 1)/2) * canvas.width;
    const my = canvas.height - ((target.y + 1)/2) * canvas.height;
    const mradius = (target.radius/2) * canvas.width;

    context.beginPath();
    context.arc(mx, my, mradius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function clearWindow() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var targets = [];

// fill targets array
for (var i = 0; i < 1; i++) {
    targets.push(new Target(0, 0, 0.05, 0.01, 0.01))
}

function tick() {
    // Your update logic goes here (e.g., move targets, update game state)

    // Clear the canvas
    clearWindow();

    // draw targets
    for (var i = 0; i < targets.length; i++) {
        targets[i].tick(1, 1, 0.001);
        drawTarget(targets[i], "black");
    }

    requestAnimationFrame(tick);
}

// dynamically resize the canvas whenever the window is changed
window.addEventListener("resize", setCanvasSize);
setCanvasSize();
tick();