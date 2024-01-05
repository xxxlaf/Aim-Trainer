export function map_x(x, canvas) {
    return ((x + 1)/2) * canvas.width;
}

export function map_y(y, canvas) {
    return canvas.height - ((y + 1)/2) * canvas.height;
}

export function map_radius(radius, canvas) {
    return (radius/2) * canvas.width;
}