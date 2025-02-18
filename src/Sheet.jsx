import { useRef, useEffect } from "react";

import getRowsAndColsCount from "./util";
import { resizeCanvas } from "./util";

const Sheet= ()=>{

    const canvasRef= useRef();

    const CanvasWidth= window.innerWidth;
    const CanvasHeight= window.innerHeight;

    const CellWidth= 100;
    const CellHeight= 20;

    const colCount= getRowsAndColsCount(CellWidth, CanvasWidth);
    const rowCount= getRowsAndColsCount(CellHeight, CanvasHeight);

    useEffect(()=>{
        const canvas= canvasRef.current;
        const context= canvas.getContext('2d');

        resizeCanvas(canvas);

        context.fillStyle= 'white';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        let startX=0

        for(let col=0; col<colCount; col++){
            context.beginPath();
            context.moveTo(startX, 0);
            context.lineTo(startX, context.canvas.height);
            context.stroke()

            startX+=CellWidth;
        }
    })

    console.log(colCount, rowCount);

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <canvas ref={canvasRef} style={{width: '100%', height: '100%'}} />
        </div>
    )
}

export default Sheet