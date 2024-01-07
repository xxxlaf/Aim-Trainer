import { Tracer } from "./classes/class_tracer.js";
import { renderTargets, renderTracers } from "./utilities/utility_drawing.js";
import { is_click_in_target } from "./utilities/utility_functions.js";
import { setCanvasSize, clearWindow } from "./utilities/utility_canvas.js";
import { generate_targets_by_level } from "./utilities/utility_game.js";

// get the canvas element for rendering the drawings
var canvas = document.getElementById('canvas-api canvas');
var context = canvas.getContext('2d');

var current_level = 0;

// create targets and tracers arrays for target and tracer tracking
var targets = generate_targets_by_level(0);
var tracers = [];

// create a variable to keep track of the click count
var clickCount = 0;
var targetsHit = 0;

function updateDisplay() {
    // Display accuracy
    const accuracy = targetsHit / clickCount * 100 || 0; // Calculate accuracy (avoid division by zero)
    const accuracyText = `Accuracy: ${accuracy.toFixed(2)}%`;

    // Display current level
    const levelText = `Level: ${current_level + 1}`;

    // Render the text on the screen
    context.font = '16px Arial';
    context.fillStyle = 'black';
    context.fillText(accuracyText, 10, 20);
    context.fillText(levelText, 10, 40);
}

// a recursively called function
// this is where all of the game logic occurs
function tick() {
    // "refresh" the screen
    clearWindow(canvas, context);

    // sometimes targets length is null and that's not good most of the time
    if (targets) {
        if (targets.length > 0) {
            // draw all of the targets
            renderTargets(targets, "black", 2, 2, 0.001, canvas, context);
        } else {
            targets = generate_targets_by_level(++current_level);
        }
    
        if (tracers.length > 0) {
            // draw all of the tracer
            renderTracers(tracers, "red", 0.1, 0.01, canvas, context);
        }
    
        updateDisplay();
    }

    // not exactly sure what this function does, but it just calls the function again per frame (I'm just guessing)
    requestAnimationFrame(tick);
}

canvas.addEventListener("click", function (event) {
    clickCount++;
    // draw a new tracer where the mouse click was
    tracers.push(new Tracer(((event.clientX / canvas.width) * 2) - 1, 1 - (event.clientY / canvas.height) * 2, 0.005, 0.05));

    new Tracer()

    // check if the click position was inside the target
    for (let i = 0; i < targets.length; i++) {
        if (is_click_in_target(event.clientX, event.clientY, targets[i], canvas)) {
            targets.splice(i, 1);
            targetsHit++;
        }
    }
});

// dynamically resize the canvas whenever the window is changed
window.addEventListener("resize", setCanvasSize(canvas));
setCanvasSize(canvas);
tick();