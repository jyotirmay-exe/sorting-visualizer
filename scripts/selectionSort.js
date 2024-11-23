async function selectionSort() {    
    for(let i=0; i<size-1; i++) {
        bars[i].style.backgroundColor = colRed;
        let smol = i, prevsmol=smol;
        for(let j=i+1; j<size; j++) {
            if(stopflag) { return; }
            playclicksound();
            bars[j].style.backgroundColor = colYellow;

            await sleep(delay);

            if(getHeight(j) < getHeight(smol)) {
                prevsmol = smol;
                smol=j;
            }
            if(prevsmol!=smol && prevsmol!=i)
                bars[prevsmol].style.backgroundColor = colBlue;
            if(j!=smol)
                bars[j].style.backgroundColor = colBlue;
            else
                bars[j].style.backgroundColor = colGreen;
        }
        if(i!=smol) {
            playswapsound();
            bars[i].style.backgroundColor = colGreen;
            bars[smol].style.backgroundColor = colGreen;
            await sleep(250);
            let temp = getHeight(i);
            bars[i].style.height = getHeight(smol)+"px";
            bars[smol].style.height = temp+"px";
        }
        await sleep(250);
        bars[smol].style.backgroundColor = colBlue;
        bars[i].style.backgroundColor = colBlue;
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