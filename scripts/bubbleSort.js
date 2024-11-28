async function bubbleSort() {
    for(let i=0; i<size; i++) {
        for(let j=0; j<size-i-1; j++) {
            if(stopflag) { return; }
            playclicksound();
            bars[j].style.backgroundColor = colRed;
            bars[j+1].style.backgroundColor = colYellow;
            await sleep(delay);

            if(getHeight(j)>getHeight(j+1)) {
                playswapsound();
                bars[j].style.backgroundColor = colGreen;
                bars[j+1].style.backgroundColor = colGreen;
                await sleep(250);
                let temp = getHeight(j);
                bars[j].style.height = getHeight(j+1)+"px";
                bars[j+1].style.height = temp+"px";
                await sleep(250);

            }

            bars[j].style.backgroundColor = colBlue;
            bars[j+1].style.backgroundColor = colBlue;
        }
    }
    playfinishsound();
    for(let i=0; i<size; i++) {
        await sleep(30);
        bars[i].style.backgroundColor = colGreen;
    }
    for(let i=0; i<size; i++) {
        await sleep(30);
        bars[i].style.backgroundColor = colBlue;
    }
}