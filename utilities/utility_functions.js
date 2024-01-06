import { Target } from "../classes/class_target.js";
import { map_x, map_y, map_radius } from "./utility_mapping.js";

/**
 * Generates a random number between min and max (inclusive).
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} A random number between min and max (inclusive).
 */
export function uniform(min, max) {
    return Math.random() * (max - min + 1) + min;
}

/**
 * Handles border collisions for a target, reversing its velocity if it goes beyond the canvas boundaries.
 * @param {Target} target The target object to check for collisions.
 */
export function handle_border_collision(target) {
    if (target.x + target.radius > 1 || target.x - target.radius < -1) { 
        target.vx *= -1
    }
    if (target.y + target.radius > 1 || target.y - target.radius < -1) {
        target.vy *= -1
    }
}

/**
 * Generates an array of target objects with random positions, velocities, and radii.
 * @param {number} target_count The number of target objects to generate.
 * @returns {Target[]} An array containing the generated target objects.
 */
export function generate_targets(target_count, radius_min, radius_max, v_min, v_max) {
    var targets = [];

    for (var i = 0; i < target_count; i++) {
        targets.push(new Target(uniform(-1, 1) / 2,                     // x
            uniform(-1, 1) / 2,                                         // y
            uniform(radius_min + 1, radius_max + 1) / 25,                      // radius
            uniform(-uniform(v_min, v_max), uniform(v_min, v_max)),     // vx
            uniform(-uniform(v_min, v_max), uniform(v_min, v_max))));   // vy
        
        console.log(targets[i]);
    }

    return targets;
}

/**
 * Checks if a given point (mouse click) is within the boundaries of a target on the canvas.
 * @param {number} mouseX The x-coordinate of the mouse click.
 * @param {number} mouseY The y-coordinate of the mouse click.
 * @param {Target} target The target object to check against.
 * @param {HTMLCanvasElement} canvas The canvas element containing the targets.
 * @returns {boolean} Returns true if the point is within the target boundaries; otherwise, returns false.
 */
export function is_click_in_target(mouseX, mouseY, target, canvas) {
    const mx = map_x(target.x, canvas);
    const my = map_y(target.y, canvas);
    const mradius = map_radius(target.radius, canvas);

    if (mouseX >= mx - mradius && mouseX <= mx + mradius && mouseY >= my - mradius && mouseY <= my + mradius) {
        return true;
    } else {
        return false;
    }
}