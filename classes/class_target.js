export class Target {
    vx = 0;
    vy = 0;
    radius = 1;
    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    tick(Fx, Fy, delta_t) {
        this.x += this.vx * delta_t;
        this.y += this.vy * delta_t;
        this.vx += Fx * delta_t;
        this.vy += Fy * delta_t;
    }
}