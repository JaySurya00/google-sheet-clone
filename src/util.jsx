
export default function getRowsAndColsCount(size, visiableSize){

    let start=0;
    let count=0;

    while(start<=visiableSize){
        count+=1;
        start+=size;
    }

    return count
}

export function resizeCanvas(canvas){
    const {width, height}= canvas.getBoundingClientRect();

    const ratio= window.devicePixelRatio;

    const newCanvasHeight= Math.round(height*ratio);
    const newCanvasWidth= Math.round(width*ratio);

    const context= canvas.getContext('2d');

    canvas.width= newCanvasWidth;
    canvas.height= newCanvasHeight;

    context.scale(ratio, ratio);
}