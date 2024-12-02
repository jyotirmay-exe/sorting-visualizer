async function mergeSort(start, end) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid);
    await sleep(delay);
    await mergeSort(mid + 1, end);

    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    if(stopflag) return;

    let temp = [];
    let i = start, j = mid + 1;

    bars[start].style.backgroundColor = colRed;
    bars[end].style.backgroundColor = colRed;

    playclicksound(); 
    await sleep(delay);

    while (i <= mid && j <= end) {
        if (getHeight(i) <= getHeight(j)) {
            temp.push(getHeight(i));
            i++;
        } else {
            temp.push(getHeight(j));
            j++;
        }
    }
    while (i <= mid) {
        temp.push(getHeight(i));
        i++;
    }
    while (j <= end) {
        temp.push(getHeight(j));
        j++;
    }
    playclicksound(); 

    for (let k = start; k <= end; k++) {
        let currentHeight = getHeight(k); 
        let newHeight = temp[k - start]; 
    
        if (currentHeight !== newHeight) {
            bars[k].style.height = newHeight + "px";
            if(k!=start && k!=end)
                bars[k].style.backgroundColor = colGreen;
            playswapsound();
        } else {
            if(k!=start && k!=end)
                bars[k].style.backgroundColor = colYellow; 
        }
        await sleep(delay);
        if(k!=start && k!=end)
            bars[k].style.backgroundColor = colBlue; 
    }
    
    bars[start].style.backgroundColor = colBlue;
    bars[end].style.backgroundColor = colBlue;
}

async function startMergeSort() {
    await mergeSort(0, size - 1);
    if(stopflag) return;
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
