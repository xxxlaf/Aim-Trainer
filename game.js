import { Tracer } from "./classes/class_tracer.js";
import { drawTarget, drawTracer } from "./utilities/utility_drawing.js";
import { handle_border_collision, generate_targets, is_click_in_target } from "./utilities/utility_functions.js";
import { setCanvasSize, clearWindow } from "./utilities/utility_canvas.js";

var canvas = document.getElementById('canvas-api canvas');
var context = canvas.getContext('2d');

var targets = generate_targets(3);
var tracers = [];

function tick() {
    clearWindow(canvas, context);

    for (var i = 0; i < targets.length; i++) {
        drawTarget(targets[i], "black", canvas, context);
        handle_border_collision(targets[i]);
        targets[i].tick(0, 0, 0.001);
    }

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
    // draw a new tracer on click
    tracers.push(new Tracer(((event.clientX / canvas.width) * 2) - 1, 1 - (event.clientY / canvas.height) * 2, 0.005, 0.05));

    // Check if the click is inside any target
    for (let i = 0; i < targets.length; i++) {
        if (is_click_in_target(event.clientX, event.clientY, targets[i], canvas)) {
            targets.splice(i, 1);
        }
    }
});

// dynamically resize the canvas whenever the window is changed
window.addEventListener("resize", setCanvasSize(canvas));
setCanvasSize(canvas, context);
tick();