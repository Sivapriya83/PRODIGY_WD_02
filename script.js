let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

// Sound effects
const startSound = new Audio('start-sound.mp3');
const stopSound = new Audio('stop-sound.mp3');
const lapSound = new Audio('lap-sound.mp3');

// Function to start or stop the stopwatch
function startStop() {
    const startStopButton = document.getElementById("startStop");

    if (isRunning) {
        clearInterval(timer);
        startStopButton.innerText = "Start";
        startStopButton.style.backgroundColor = "#ff5c8d";
        stopSound.play(); // Play stop sound
    } else {
        startTime = new Date().getTime() - (startTime || 0);
        timer = setInterval(updateDisplay, 10);
        startStopButton.innerText = "Stop";
        startStopButton.style.backgroundColor = "#ff3d5c";
        startSound.play(); // Play start sound
    }

    isRunning = !isRunning;
}

// Function to reset the stopwatch
function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    lapCounter = 1;

    document.getElementById("display").innerText = "00:00:000";
    document.getElementById("startStop").innerText = "Start";
    document.getElementById("startStop").style.backgroundColor = "#ff5c8d";
    document.getElementById("laps").innerHTML = "";
}

// Function to record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const formattedTime = formatTime(lapTime);

        const lapItem = document.createElement("li");
        lapItem.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${formattedTime}</span>`;
        lapItem.classList.add("lap-item");
        document.getElementById("laps").appendChild(lapItem);

        // Scroll to the last lap after the 4th lap
        if (lapCounter > 4) {
            document.querySelector('.lap-list-container').scrollTop = document.querySelector('.lap-list-container').scrollHeight;
        }

        lapCounter++;
        lapSound.play(); // Play lap sound
    }
}

// Function to update the stopwatch display
function updateDisplay() {
    const elapsedTime = new Date().getTime() - startTime;
    document.getElementById("display").innerText = formatTime(elapsedTime);
}

// Function to format the time (mm:ss:SSS)
function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function padMilliseconds(number) {
    return number < 100 ? `0${number}` : number;
}

// Light/Dark Mode Toggle
// Function to toggle the dark mode
function toggleMode() {
    document.body.classList.toggle("dark-mode");
    const modeButton = document.getElementById("modeToggle");
    modeButton.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
}



