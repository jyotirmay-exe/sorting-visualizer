window.onload = updateRange();

var size = 0;
var delay = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    updateRange();
});

function updateRange() {
    updateSpeed();
    updateSize();
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

    let arr = [];
    for (let i = 1; i <= value; i++) {
        arr.push(i * unitHeight);
    }

    document.querySelector('.bars').innerHTML = "";
    for (let i = 0; i < size; i++) {
        document.querySelector('.bars').innerHTML += `<div class='bar' style="height:${arr[i]}px;"></div>`;
    }
}

function updateSpeed() {
    const slider = document.querySelector(".speedslider");
    let value = parseInt(slider.value);
    value = Math.round(value / 100) * 100;
    delay = value;
    slider.value = value;
    document.getElementById("speedVal").innerText = slider.value + "ms";
}
