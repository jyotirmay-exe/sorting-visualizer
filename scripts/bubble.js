async function bubbleSort() {
    for(let i=0; i<size; i++) {
        for(let j=0; j<size-i-1; j++) {
            bars[j].style.backgroundColor = colRed;
            bars[j+1].style.backgroundColor = colYellow;
            await sleep(delay);

            if(getHeight(j)>getHeight(j+1)) {
                bars[j].style.backgroundColor = colGreen;
                bars[j+1].style.backgroundColor = colGreen;
                await sleep(500);

                let temp = getHeight(j);
                bars[j].style.height = getHeight(j+1)+"px";
                bars[j+1].style.height = temp+"px";
            }
            await sleep(delay);

            bars[j].style.backgroundColor = colBlue;
            bars[j+1].style.backgroundColor = colBlue;
        }
    }

    for(let i=0; i<size; i++) {
        await sleep(delay/5);
        bars[i].style.backgroundColor = colGreen;
    }
    
    for(let i=0; i<size; i++) {
        await sleep(delay/5);
        bars[i].style.backgroundColor = colBlue;
    }
}