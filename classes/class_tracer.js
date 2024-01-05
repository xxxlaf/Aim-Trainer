export class Tracer {
    constructor(x, y, start_radius, end_radius) {
        this.x = x;
        this.y = y;
        this.cur_radius = start_radius;
        this.end_radius = end_radius;
    }

    tick(radius_step, delta_t) {
        if (this.cur_radius > this.end_radius) {
            return true;
        } else {
            this.cur_radius += radius_step * delta_t;
            return false;
        }
    }
}