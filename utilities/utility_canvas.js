export function setCanvasSize(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function clearWindow(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}