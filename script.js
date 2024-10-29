window.onload = updateRange();

var size=0;
var delay=0;

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
    size=value;
    document.getElementById("sizeVal").innerText = slider.value;
}

function updateSpeed() {
    const slider = document.querySelector(".speedslider");
    let value = parseInt(slider.value);
    value = Math.round(value / 100) * 100;
    delay=value;
    slider.value = value;
    document.getElementById("speedVal").innerText = slider.value+"ms";
}
