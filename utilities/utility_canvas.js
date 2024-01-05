/**
 * Sets the size of the canvas to match the current window dimensions.
 * @param {HTMLCanvasElement} canvas The canvas element to resize.
 */
export function setCanvasSize(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Clears the entire content of the canvas.
 * @param {HTMLCanvasElement} canvas The canvas element to clear.
 * @param {CanvasRenderingContext2D} context The 2D rendering context of the canvas.
 */
export function clearWindow(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}