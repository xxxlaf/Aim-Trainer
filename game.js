import { Tracer } from "./classes/class_tracer.js";
import { renderTargets, renderTracers } from "./utilities/utility_drawing.js";
import { generate_targets, is_click_in_target } from "./utilities/utility_functions.js";
import { setCanvasSize, clearWindow } from "./utilities/utility_canvas.js";

// get the canvas element for rendering the drawings
var canvas = document.getElementById('canvas-api canvas');
var context = canvas.getContext('2d');

// create targets and tracers arrays for target and tracer tracking
var targets = generate_targets(3);
var tracers = [];

// a recursively called function
// this is where all of the game logic occurs
function tick() {
    // "refresh" the screen
    clearWindow(canvas, context);

    // draw all of the targets
    renderTargets(targets, "black", 0, 0, 0.001, canvas, context);

    // draw all of the tracer
    renderTracers(tracers, "red", 0.1, 0.01, canvas, context);

    // not exactly sure what this function does, but it just calls the function again per frame (I'm just guessing)
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
setCanvasSize(canvas);
tick();