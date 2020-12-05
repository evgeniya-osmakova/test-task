import React, { useRef, useEffect } from 'react';
import './Preview.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as allActions from '../../actions';

function Preview() {
  const canvasRef = useRef(null);

  const dispatch = useDispatch();

  const background = useSelector((state) => state.background);
  const img = useSelector((state) => state.img);
  const text = useSelector((state) => state.text);

  const draw = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(150, 0, 141, 188);
    const { color1, color2 } = background;
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 141, 188);

    if (img.addImg) {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = img.url;
      image.onload = () => {
        if (img.width !== 0 && img.height !== 0) {
          ctx.drawImage(image, img.x, img.y, img.width, img.height);
        } else {
          ctx.drawImage(image, img.x, img.y);
        }
        dispatch(allActions.addPng({ img: canvas.toDataURL('image/png') }));
      };
    }

    const { text: textData } = text;
    const { color: textColor, size } = text;
    ctx.font = `${size}px Helvetica Neue`;
    ctx.fillStyle = textColor;
    if (textData) {
      const textRows = textData.split('\n');
      const threeTextRows = textRows.slice(0, 3);
      const rowsCount = threeTextRows.length;
      const marginBottom = 5;
      const marginLeft = 5;
      for (let i = 0; i < rowsCount; i += 1) {
        ctx.fillText(textRows[i], marginLeft,
          canvas.height - size * (rowsCount - i - 1) - marginBottom);
      }
    }

    dispatch(allActions.addPng({ img: canvas.toDataURL('image/png') }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context, canvas);
  }, [draw]);

  return (
      <canvas ref={canvasRef} className="canvas" width="141" height="188"/>
  );
}

export default Preview;
