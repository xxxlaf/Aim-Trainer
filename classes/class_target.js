export class Target {
    vx = 0;
    vy = 0;
    radius = 1;
    /**
     * 
     * @param {number} x The initial x-coordinate of the target's position.
     * @param {number} y The initial y-coordinate of the target's position.
     * @param {number} radius The radius of the target.
     * @param {number} vx The initial x-component of the target's velocity.
     * @param {number} vy The initial y-component of the target's velocity.
     */
    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    /**
     * Updates the target's position and velocity based on forces and time elapsed.
     * @param {number} Fx The force applied in the x-direction.
     * @param {number} Fy The force applied in the y-direction.
     * @param {number} delta_t The time elapsed since the last tick.
     */
    tick(Fx, Fy, delta_t) {
        this.x += this.vx * delta_t;
        this.y += this.vy * delta_t;
        this.vx += Fx * delta_t;
        this.vy += Fy * delta_t;
    }
}