import { map_x, map_y, map_radius } from "./utility_mapping.js";

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