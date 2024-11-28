async function insertionSort() {
    for (let i = 1; i < size; i++) {
        let keyHeight = getHeight(i);
        let j = i - 1;
        if (stopflag) { return; }
        bars[i].style.backgroundColor = colRed;
        await sleep(250);
        playclicksound();

        while (j >= 0 && getHeight(j) > keyHeight) {
            if (stopflag) { return; }
            bars[j].style.backgroundColor = colGreen;
            bars[j + 1].style.backgroundColor = colYellow;
            await sleep(delay);
            bars[j + 1].style.height = getHeight(j) + "px";
            playswapsound();
            bars[j].style.backgroundColor = colBlue;
            bars[j + 1].style.backgroundColor = colBlue;
            j--;
        }
        bars[j + 1].style.backgroundColor = colGreen;
        bars[j + 1].style.height = keyHeight + "px";
        await sleep(500);
        bars[j + 1].style.backgroundColor = colBlue;
        bars[i].style.backgroundColor = colBlue;
    }

    playfinishsound();
    for (let i = 0; i < size; i++) {
        await sleep(30);
        bars[i].style.backgroundColor = colGreen;
    }
    for (let i = 0; i < size; i++) {
        await sleep(30);
        bars[i].style.backgroundColor = colBlue;
    }
}
