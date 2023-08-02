export const FilledRectangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  width: number,
  color: any
) => {
  ctx.beginPath();
  ctx.rect(x, y, width, length);
  ctx.fillStyle = color;
  ctx.fill();
};

export const StrokeRectangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  width: number,
  color: any
) => {
  ctx.beginPath();
  ctx.rect(x, y, width, length);
  ctx.strokeStyle = color;
  ctx.stroke();
};

export const FilledCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  color: any
) => {
  if (ctx) {
    ctx.beginPath();
    ctx.arc(x, y, width, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
};

export const FilledTriangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: any
) => {
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.fillStyle = color;
    ctx.fill();
  }
};
