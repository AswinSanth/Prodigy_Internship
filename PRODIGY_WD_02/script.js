let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let loopCount = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const loopBtn = document.getElementById('loopBtn');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const loopsList = document.getElementById('loopsList');
const loopCountSpan = document.createElement('span');

loopCountSpan.id = 'loopCount';
loopCountSpan.style.display = 'block';
loopCountSpan.style.marginTop = '10px';
document.querySelector('.loops').appendChild(loopCountSpan);

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
loopBtn.addEventListener('click', addLoop);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startStopBtn.innerHTML = 'Start';
    running = false;
    difference = 0;
    minutesSpan.innerHTML = '00';
    secondsSpan.innerHTML = '00';
    millisecondsSpan.innerHTML = '00';
    loopsList.innerHTML = '';
    loopCount = 0;
    updateLoopCount();
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    minutesSpan.innerHTML = minutes;
    secondsSpan.innerHTML = seconds;
    millisecondsSpan.innerHTML = milliseconds;
}

function addLoop() {
    if (running) {
        const loopTime = `${minutesSpan.innerHTML}:${secondsSpan.innerHTML}:${millisecondsSpan.innerHTML}`;
        const li = document.createElement('li');
        li.innerHTML = `Loop ${loopCount + 1}: ${loopTime}`;
        loopsList.appendChild(li);
        loopCount++;
        updateLoopCount();
    }
}

function updateLoopCount() {
    loopCountSpan.innerHTML = `Total Loops: ${loopCount}`;
}
