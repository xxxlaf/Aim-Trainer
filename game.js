import { Target } from "./classes/class_target.js";
import { Tracer } from "./classes/class_tracer.js";
import { map_x, map_y, map_radius } from "./utilities/utility_mapping.js";
import { drawTarget, drawTracer } from "./utilities/utility_drawing.js";
import { uniform } from "./utilities/utility_functions.js";

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



function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
        drawTarget(targets[i], "black", canvas, context);
        handle_border_collision(targets[i]);
        targets[i].tick(0, 0, 0.001);
    }

    // draw tracers
    for (var i = 0; i < tracers.length; i++) {
        console.log("drawing tracer");
        drawTracer(tracers[i], "red", canvas, context);
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