import { Button, ButtonGroup, Paper } from '@mui/material';
import {
  FilledCircle,
  FilledRectangle,
  FilledTriangle,
  StrokeRectangle,
} from '@TheArtist/TheCanvas';
import React, { useEffect, useRef } from 'react';
import { ColorPallete } from './color';
interface IArtBoard {
  height: number;
  width: number;
  border: string;
}
const ArtBoard: React.FC<IArtBoard> = (props) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  let ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
  useEffect(() => {
    ctx.current = canvas.current?.getContext('2d');
    if (ctx.current) {
      drawArt(ctx.current);
      // setInterval(() => {
      //   if(ctx && ctx.current)drawArt(ctx.current);
      //   handlePrint();
      // }, 100)
    }
  }, []);

  useEffect(() => {
   if(canvas?.current?.height) canvas.current.height = props.height;
   if(canvas?.current?.width) canvas.current.height = props.height;
   if(ctx?.current)drawArt(ctx.current);
  }, [props.height, props.width])

  const drawArt = (ctx: CanvasRenderingContext2D) => {
    let colorPallete = ColorPallete[getRandomInt(0, ColorPallete.length)];
    FilledRectangle(
      ctx,
      0,
      0,
      props.height,
      props.width,
      colorPallete[getRandomInt(0, colorPallete.length)]
    );
    for (let i = 0; i <= 3; i++) {
      let x = getRandomInt(1, props.width / 2);
      let y = getRandomInt(1, props.height / 2);
      let length = getRandomInt(1, props.height);
      let width = getRandomInt(1, props.width);
      let range = getRandomInt(1, 5);
      let color = hexToRGB(colorPallete[getRandomInt(0, colorPallete.length)]);
      switch (range) {
        case 1:
          FilledRectangle(ctx, x, y, length, width, color);
          break;
        case 2:
          const x1 = getRandomInt(1, props.width);
          const x2 = getRandomInt(1, props.width);
          const y1 = getRandomInt(1, props.height);
          const y2 = getRandomInt(1, props.height);
          FilledTriangle(ctx, x, y, x1, y1, x2, y2, color);
          break;
        case 3:
          FilledCircle(ctx, x, y, width, color);
          break;
        case 4:
          StrokeRectangle(ctx, x, y, length, width, color);
          break;
      }
    }
  };

  function hexToRGB(h: string) {
    let r = "0", g = "0", b = "0", a = "0";
  
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    a = Math.random().toFixed(1);
    
    return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
  }

  function getRandomSolidColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomColor() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      'rgba(' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      r().toFixed(1) +
      ')'
    );
  }

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  const handlePrint = () => {
    const dataURL = canvas.current?.toDataURL('image/png', 1.0);
    var link = document.createElement('a');
    link.download = 'TheArtist.png';
    link.href = dataURL || '';
    link.click();
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button 
        sx={{m: '1rem'}}
        onClick={handlePrint}>Print Art</Button>
        <Button
        sx={{m: '1rem'}}
          onClick={(e) => {
            if (ctx.current) drawArt(ctx.current);
          }}
        >
          New Art
        </Button>
      </ButtonGroup>
      <div>
        <canvas
          ref={canvas}
          style={{ objectFit: 'contain' }}
          width={props.width}
          height={props.height}
        ></canvas>
      </div>
    </Paper>
  );
};
export default ArtBoard;
