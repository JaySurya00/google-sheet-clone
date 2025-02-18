import { useRef, useEffect } from "react";

import getRowsAndColsCount from "./util";
import { resizeCanvas } from "./util";
import { getEncodedChar } from "./util";

const Sheet= ()=>{

    const canvasRef= useRef();

    const CanvasWidth= window.innerWidth;
    const CanvasHeight= window.innerHeight;

    const CellWidth= 100;
    const CellHeight= 20;

    const rowHeaderWidth= 50;
    const columnHeaderHeight=20;
    const headerColor= '#f8f9fa';
    const gridLineColor= '#e2e3e3';

    const colCount= getRowsAndColsCount(CellWidth, CanvasWidth, rowHeaderWidth);
    const rowCount= getRowsAndColsCount(CellHeight, CanvasHeight, columnHeaderHeight);

    useEffect(()=>{
        const canvas= canvasRef.current;
        const context= canvas.getContext('2d');

        resizeCanvas(canvas);

        context.fillStyle= 'white';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle= headerColor;
        context.fillRect(0,0,context.canvas.width, columnHeaderHeight);
        context.fillRect(0,0,rowHeaderWidth, context.canvas.height);
        context.font= '13px sans-serif';

        context.strokeStyle= gridLineColor;

        let startY= columnHeaderHeight;

        for(let row=0; row<rowCount; row++){
            context.beginPath();
            context.moveTo(rowHeaderWidth, startY);
            context.lineTo(context.canvas.width, startY);
            context.stroke()

            startY+=CellHeight;
        }

        startY= columnHeaderHeight;

        for(let row=0; row<rowCount; row++){
            context.beginPath();
            context.moveTo(0, startY);
            context.lineTo(rowHeaderWidth, startY);
            context.stroke()

            startY+=CellHeight;
        }
        
        let startX=rowHeaderWidth;

        for(let col=0; col<colCount; col++){
            context.beginPath();
            context.moveTo(startX, columnHeaderHeight);
            context.lineTo(startX, context.canvas.height);
            context.stroke()

            startX+=CellWidth;
        }

        startX=rowHeaderWidth;

        for(let col=0; col<colCount; col++){
            context.beginPath();
            context.moveTo(startX, 0);
            context.lineTo(startX, columnHeaderHeight);
            context.stroke()

            startX+=CellWidth;
        }

        context.font= '13px sans-serif';
        context.fillStyle= 'black';
        context.textBaseline='middle';
        context.textAlign= 'center';


        startX=rowHeaderWidth;

        for(let col=0; col<colCount; col++){
            const centerX= startX + Math.round(CellWidth*0.5);
            const centerY= Math.round(columnHeaderHeight * 0.5);

            const content= getEncodedChar(col+1);
            context.fillText(content, centerX, centerY);

            startX+=CellWidth;
        }
        
        startY= columnHeaderHeight;

        for(let row=0; row<rowCount; row++){
            const centerX= Math.round(rowHeaderWidth*0.5);
            const centerY= startY + Math.round(CellHeight * 0.5);

            const content= row+1;
            context.fillText(content, centerX, centerY);

            startY+=CellHeight;
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