/**
 * Maps a normalized x-coordinate to the corresponding coordinate on the canvas.
 * @param {number} x The normalized x-coordinate in the range [-1, 1].
 * @param {HTMLCanvasElement} canvas The canvas element to map the x-coordinate onto.
 * @returns {number} The mapped x-coordinate on the canvas.
 */
export function map_x(x, canvas) {
    return ((x + 1)/2) * canvas.width;
}

/**
 * Maps a normalized y-coordinate to the corresponding coordinate on the canvas.
 * @param {number} y The normalized y-coordinate in the range [-1, 1].
 * @param {HTMLCanvasElement} canvas The canvas element to map the y-coordinate onto.
 * @returns {number} The mapped y-coordinate on the canvas.
 */
export function map_y(y, canvas) {
    return canvas.height - ((y + 1)/2) * canvas.height;
}

/**
 * Maps a normalized radius to the corresponding radius on the canvas.
 * @param {number} radius The normalized radius in the range [0, 1].
 * @param {HTMLCanvasElement} canvas The canvas element to map the radius onto.
 * @returns {number} The mapped radius on the canvas.
 */
export function map_radius(radius, canvas) {
    return (radius/2) * canvas.width;
}