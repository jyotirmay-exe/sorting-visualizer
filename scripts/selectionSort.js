function getHeight(i) {
    return parseFloat(bars[i].style.height);
}

async function selectionSort() {    
    for(let i=0; i<size-1; i++) {
        bars[i].style.backgroundColor = colRed;
        let smol = i, prevsmol=smol;
        for(let j=i+1; j<size; j++) {
            bars[j].style.backgroundColor = colYellow;

            await sleep(delay);

            if(getHeight(j) < getHeight(smol)) {
                prevsmol = smol;
                smol=j;
                bars[smol].style.backgroundColor = colGreen;
            }

            bars[j].style.backgroundColor = colBlue;
            
            if(prevsmol!=i)
                bars[prevsmol].style.backgroundColor = colBlue;
        }

        if(i!=smol) {
            bars[i].style.backgroundColor = colGreen;
            bars[smol].style.backgroundColor = colGreen;

            let temp = getHeight(i);
            bars[i].style.height = getHeight(smol)+"px";
            bars[smol].style.height = temp+"px";
        }
        await sleep(500);
        bars[smol].style.backgroundColor = colBlue;
        bars[i].style.backgroundColor = colBlue;
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