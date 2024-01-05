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

function handle_border_collision(target) {
    if (target.x + target.radius > 1 || target.x - target.radius < -1) {
        target.vx *= -1
    }
    if (target.y + target.radius > 1 || target.y - target.radius < -1) {
        target.vy *= -1
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
    targets.push(new Target(0, 0, 0.05, uniform() * 5, uniform() * 5));
}

function tick() {
    // Your update logic goes here (e.g., move targets, update game state)

    // Clear the canvas
    clearWindow();

    // draw targets
    for (var i = 0; i < targets.length; i++) {
        drawTarget(targets[i], "black");
        handle_border_collision(targets[i]);
        targets[i].tick(0, 0, 0.001);
    }

    requestAnimationFrame(tick);
}

canvas.addEventListener("click", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Check if the click is inside any target
    for (let i = 0; i < targets.length; i++) {
        const mx = ((targets[i].x + 1) / 2) * canvas.width;
        const my = canvas.height - ((targets[i].y + 1) / 2) * canvas.height;
        const mradius = (targets[i].radius / 2) * canvas.width;

        if (mouseX >= mx - mradius && mouseX <= mx + mradius && mouseY >= my - mradius && mouseY <= my + mradius) {
            targets.splice(i, 1);
        }
    }
});

// dynamically resize the canvas whenever the window is changed
window.addEventListener("resize", setCanvasSize);
setCanvasSize();
tick();