let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = "Stop";
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Start";
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    startStopBtn.innerHTML = "Start";
    display.innerHTML = "00:00:00";
    laps.innerHTML = "";
    lapBtn.disabled = true;
}

function lap() {
    if (running) {
        const li = document.createElement('li');
        li.innerHTML = display.innerHTML;
        laps.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);