import { map_x, map_y, map_radius } from "./utility_mapping.js";
import { handle_border_collision } from "./utility_functions.js";

/**
 * Draws a target on the canvas with the specified color.
 * @param {Target} target The target object to be drawn.
 * @param {string} color The color of the target.
 * @param {HTMLCanvasElement} canvas The canvas element on which the target will be drawn.
 * @param {CanvasRenderingContext2D} context The 2D rendering context of the canvas.
 */
export function drawTarget(target, color, canvas, context) {
    context.beginPath();
    context.arc(map_x(target.x, canvas), map_y(target.y, canvas), map_radius(target.radius, canvas), 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

/**
 * Draws a tracer on the canvas with the specified color.
 * @param {Tracer} tracer The tracer object to be drawn.
 * @param {string} color The color of the tracer.
 * @param {HTMLCanvasElement} canvas The canvas element on which the tracer will be drawn.
 * @param {CanvasRenderingContext2D} context The 2D rendering context of the canvas.
 */
export function drawTracer(tracer, color, canvas, context) {
    context.beginPath();
    context.arc(map_x(tracer.x, canvas), map_y(tracer.y, canvas), map_radius(tracer.cur_radius, canvas), 0, 2 * Math.PI, false);
    context.arc(map_x(tracer.x, canvas), map_y(tracer.y, canvas), map_radius(tracer.cur_radius, canvas) - 1, 0, 2 * Math.PI, true);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

/**
 * Renders multiple targets on the canvas, handles border collisions, and updates their positions.
 * @param {Target[]} targets An array of target objects to be rendered.
 * @param {string} color The color of the targets.
 * @param {number} Fx The force applied in the x-direction.
 * @param {number} Fy The force applied in the y-direction.
 * @param {number} delta_t The time elapsed since the last rendering.
 * @param {HTMLCanvasElement} canvas The canvas element on which the targets will be rendered.
 * @param {CanvasRenderingContext2D} context The 2D rendering context of the canvas.
 */
export function renderTargets(targets, color, Fx, Fy, delta_t, canvas, context) {
    for (var i = 0; i < targets.length; i++) {
        drawTarget(targets[i], color, canvas, context);
        handle_border_collision(targets[i]);
        targets[i].tick(Fx, Fy, delta_t);
    }
}

/**
 * Renders multiple tracers on the canvas, updates their positions, and removes tracers that have exceeded a certain radius.
 * @param {Tracer[]} tracers An array of tracer objects to be rendered.
 * @param {string} color The color of the tracers.
 * @param {number} radius_step The increment by which the tracer radius should be increased during each rendering.
 * @param {number} delta_t The time elapsed since the last rendering.
 * @param {HTMLCanvasElement} canvas The canvas element on which the tracers will be rendered.
 * @param {CanvasRenderingContext2D} context The 2D rendering context of the canvas.
 */
export function renderTracers(tracers, color, radius_step, delta_t, canvas, context) {
    for (var i = 0; i < tracers.length; i++) {
        drawTracer(tracers[i], color, canvas, context);
        if (tracers[i].tick(radius_step, delta_t) === true) {
            tracers.splice(i, 1);
        }
    }
}