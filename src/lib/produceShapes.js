// adapted from hw2 — now accepts an existing canvas element (for react refs)
// instead of creating and returning a new one
export function drawProduce(canvas, shape) {
  [canvas.width, canvas.height] = [70, 70];
  const ctx = canvas.getContext("2d");
  ctx.font = "40px serif";
  ctx.textAlign = "center";
  ctx.fillText(shape.emoji, 35, 47);
}
