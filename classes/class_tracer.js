export class Tracer {
    /**
     * 
     * @param {number} x The initial x-coordinate of the tracer's position.
     * @param {number} y The initial y-coordinate of the tracer's position.
     * @param {number} start_radius The start radius of the tracer.
     * @param {number} end_radius The end radius of the tracer.
     * @throws {Error} Throws an error if start_radius is larger than end_radius.
     */
    constructor(x, y, start_radius, end_radius) {
        if (start_radius > end_radius) {
            throw new Error("Start radius cannot be larger than end radius.");
        }
        this.x = x;
        this.y = y;
        this.cur_radius = start_radius;
        this.end_radius = end_radius;
    }

    /**
     * 
     * @param {number} radius_step Determines the rate of change of the radius.
     * @param {number} delta_t The time elapsed since the last tick.
     * @returns {boolean} Returns 'true' if the current radius is greater than the end radius; otherwise, returns 'false'.
     */
    tick(radius_step, delta_t) {
        if (this.cur_radius > this.end_radius) {
            return true;
        } else {
            this.cur_radius += radius_step * delta_t;
            return false;
        }
    }
}