var size = 0;
var delay = 0;
var arr = [];
var bars = document.querySelectorAll('.bar');

var infoObj = null;
var speeds = ["Slow", "Moderate", "Fast", "Very Fast", "Light Speed"]

var stopflag = 0;

var colGreen = "#3ce77b";
var colRed = "#e74c3c";
var colBlue = "#3498db";
var colYellow = "#f1c40f";


swapsound1 = new Audio("/audio/swap1.mp3");
swapsound2 = new Audio("/audio/swap2.mp3");
swapsound3 = new Audio("/audio/swap3.mp3");
clicksound = new Audio("/audio/click.mp3");
finishsound = new Audio("/audio/finish.mp3");
finishsound.volume = 0.5;

function playswapsound() {
    swapsound1 = new Audio("/audio/swap1.mp3");
    swapsound2 = new Audio("/audio/swap2.mp3");
    swapsound3 = new Audio("/audio/swap3.mp3");
    swapsounds = [swapsound1, swapsound2, swapsound3];
    swapsounds.forEach((ele)=>{
        ele.volume = 0.5;
    });
    swapsounds[Math.floor(Math.random() * swapsounds.length)].play();
}

function playfinishsound() {
    finishsound.play();
}

function playclicksound() {
    clicksound = new Audio("/audio/click.mp3");
    clicksound.volume = 0.3;
    clicksound.play();
}

function getHeight(i) {
    return parseFloat(bars[i].style.height);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateInfo() {
    updateSize();
    info = document.querySelector(".info-content");
    title = document.querySelector(".info-title");
    select = document.getElementById('sortSelect');
    if(select.value=="none") {
        title.innerText = "Sorting Info";
        info.innerHTML = "<p>Select an algorithm and adjust the size and speed to visualize the sorting process. You can click 'Start' to begin the sorting animation and 'Stop' to halt it.</p>";
    }
    else {
        title.innerText = select.options[select.selectedIndex].text;
        info.innerHTML = `<p>${infoObj[select.value].info}</p>
                          <p>Time Complexity: ${infoObj[select.value].time}</p>
                          <p>Space Complexity: ${infoObj[select.value].space}</p>`;
    }
}

function showInfo() {
    document.getElementById("infoBox").style.display="block";
}

function hideInfo() {
    document.getElementById('infoBox').style.display="none";
}

async function updateText() {
    while(true) {
        document.querySelectorAll('.bar').forEach( (ele)=> {
            ele.innerText=Math.floor(parseFloat(ele.style.height));
        });
        await sleep(10);
        bars = document.querySelectorAll('.bar');
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
    const response = await fetch('info.json');
    infoObj = await response.json();

    updateRange();
    await updateText();
});

function updateRange() {
    updateSpeed();
    updateSize();
}

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function updateBars() {  
    document.querySelector('.bars').innerHTML = "";
    for (let i = 0; i < size; i++) {
        document.querySelector('.bars').innerHTML += `<div class='bar' style="height:${arr[i]}px;">${Math.round(arr[i])}</div>`;
    }
}

function updateSize() {
    const slider = document.querySelector(".sizeslider");
    let value = parseInt(slider.value);

    slider.value = value;
    size = value;
    document.getElementById("sizeVal").innerText = slider.value+" items";

    const maxHeight = 250;
    const unitHeight = maxHeight / value;

    arr = [];
    for (let i = 1; i <= value; i++) {
        arr.push(i * unitHeight);
    }

    shuffle(arr);
    updateBars();
}

function updateSpeed() {
    const slider = document.querySelector(".speedslider");
    let value = parseInt(slider.value);
    delay = 350/value;
    slider.value = value;
    document.getElementById("speedVal").innerText = speeds[slider.value-1];
}

async function colorAnimation() {
    for (let i = 0; i < size; i++) {
        bars[i].style.backgroundColor = "#e74c3c"; 

        if (i != 0) {
            bars[i - 1].style.backgroundColor = "#3498db"; 
        }

        for (let j = i; j < size; j++) {
            if (bars[j].style.backgroundColor !== "rgb(231, 76, 60)" && j !== i) {
                bars[j].style.backgroundColor = "#f1c40f"; 
            }

            if (j != 0 && j-1 !== i) {
                bars[j - 1].style.backgroundColor = "#3498db"; 
            }
            await sleep(delay);
        }
        bars[size - 1].style.backgroundColor = "#3498db";
    }
}

function stop() {
    stopflag = 1;
}

async function startSequence() {
    stopflag = 0;
    let sizeslider = document.querySelector(".sizeslider");
    let selector = document.getElementById('sortSelect');
    let button = document.getElementById("start");
    let reset = document.getElementById("reset");
    let stop = document.getElementById("stop");
    let selected = selector.value;

    sizeslider.disabled = true;
    selector.disabled = true;
    button.disabled = true;
    reset.disabled = true;
    stop.disabled = false;
    
    if(selected==='none') {
        alert("Select an Algorithm to proceed..");
    }
    else if(selected=='select') {
        await selectionSort();
    }
    else if(selected=='bubble') {
        await bubbleSort();
    }
    else if(selected=='insert') {
        await insertionSort();
    }
    else if(selected=='merge') {
        await startMergeSort();
    }

    sizeslider.disabled = false;
    selector.disabled = false;
    button.disabled = false;
    reset.disabled = false;
    stop.disabled = true;
}
