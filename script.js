var size = 0;
var delay = 0;
var arr = [];
var bars = document.querySelectorAll('.bar');

var colGreen = "#3ce77b";
var colRed = "#e74c3c";
var colBlue = "#3498db";
var colYellow = "#f1c40f";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

    value = Math.round(value / 2) * 2;

    slider.value = value;
    size = value;
    document.getElementById("sizeVal").innerText = slider.value;

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
    value = Math.round(value / 100) * 100;
    delay = value;
    slider.value = value;
    document.getElementById("speedVal").innerText = slider.value + "ms";
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

async function startSequence() {
    let sizeslider = document.querySelector(".sizeslider");
    let selector = document.getElementById('sortSelect');
    let button = document.getElementById("start");
    let selected = selector.value;

    sizeslider.disabled = true;
    selector.disabled = true;
    button.disabled = true;
    
    if(selected==='none') {
        alert("Select an Algorithm to proceed..");
    }
    else if(selected=='select') {
        await selectionSort();
    }

    sizeslider.disabled = false;
    selector.disabled = false;
    button.disabled = false;
}
