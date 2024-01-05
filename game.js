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

class Tracer {
    constructor(x, y, start_radius, end_radius) {
        this.x = x;
        this.y = y;
        this.cur_radius = start_radius;
        this.end_radius = end_radius;
    }

    tick(radius_step, delta_t) {
        if (this.cur_radius > this.end_radius) {
            console.log("delete!");
            return true;
        } else {
            this.cur_radius += radius_step * delta_t;
            return false;
        }
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
    return Math.random() * 3 - 1;
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

function drawTracer(tracer, color) {
    // position mapping
    const mx = ((tracer.x + 1) / 2) * canvas.width;
    const my = canvas.height - ((tracer.y + 1) / 2) * canvas.height;
    const outerRadius = (tracer.cur_radius / 2) * canvas.width;
    const innerRadius = outerRadius - 1; // Adjust the width of the ring as needed

    context.beginPath();
    context.arc(mx, my, outerRadius, 0, 2 * Math.PI, false);
    context.arc(mx, my, innerRadius, 0, 2 * Math.PI, true); // Draw the inner arc in the opposite direction
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function clearWindow() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var targets = [];
var tracers = [];

// fill targets array
for (var i = 0; i < 2; i++) {
    targets.push(new Target(uniform() / 10, uniform() / 10, 0.05, uniform() * 5, uniform() * 5));
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

    // draw tracers
    for (var i = 0; i < tracers.length; i++) {
        console.log("drawing tracer");
        drawTracer(tracers[i], "red");
        if (tracers[i].tick(0.1, 0.01) === true) {
            tracers.splice(i, 1);
        }
    }

    requestAnimationFrame(tick);
}

canvas.addEventListener("click", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    tracers.push(new Tracer(((event.clientX / canvas.width) * 2) - 1, 1 - (event.clientY / canvas.height) * 2, 0.005, 0.05));

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