import { Target } from "../classes/class_target.js";
import { map_x, map_y, map_radius } from "./utility_mapping.js";

export function uniform() {
    return Math.random() * 3 - 1;
}

export function handle_border_collision(target) {
    if (target.x + target.radius > 1 || target.x - target.radius < -1) { 
        target.vx *= -1
    }
    if (target.y + target.radius > 1 || target.y - target.radius < -1) {
        target.vy *= -1
    }
}

export function generate_targets(target_count) {
    var targets = [];

    for (var i = 0; i < target_count; i++) {
        targets.push(new Target(uniform() / 10, uniform() / 10, 0.05, uniform() * 5, uniform() * 5));
    }

    return targets;
}

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