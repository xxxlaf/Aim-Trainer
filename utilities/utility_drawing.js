import { map_x, map_y, map_radius } from "./utility_mapping.js";
import { handle_border_collision } from "./utility_functions.js";

export function drawTarget(target, color, canvas, context) {
    context.beginPath();
    context.arc(map_x(target.x, canvas), map_y(target.y, canvas), map_radius(target.radius, canvas), 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

export function drawTracer(tracer, color, canvas, context) {
    context.beginPath();
    context.arc(map_x(tracer.x, canvas), map_y(tracer.y, canvas), map_radius(tracer.cur_radius, canvas), 0, 2 * Math.PI, false);
    context.arc(map_x(tracer.x, canvas), map_y(tracer.y, canvas), map_radius(tracer.cur_radius, canvas) - 1, 0, 2 * Math.PI, true);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

export function renderTargets(targets, color, Fx, Fy, delta_t, canvas, context) {
    for (var i = 0; i < targets.length; i++) {
        drawTarget(targets[i], color, canvas, context);
        handle_border_collision(targets[i]);
        targets[i].tick(Fx, Fy, delta_t);
    }
}

export function renderTracers(tracers, color, radius_step, delta_t, canvas, context) {
    for (var i = 0; i < tracers.length; i++) {
        drawTracer(tracers[i], color, canvas, context);
        if (tracers[i].tick(radius_step, delta_t) === true) {
            tracers.splice(i, 1);
        }
    }
}