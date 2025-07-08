let startTime, interval;
let running = false;
let elapsed = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateTime() {
  const current = Date.now();
  const time = elapsed + (current - startTime);
  display.textContent = formatTime(time);
}

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const msPart = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${min}:${sec}:${msPart}`;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
    running = true;
  }
});

pauseBtn.addEventListener("click", () => {
  if (running) {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  display.textContent = "00:00:00";
  running = false;
  elapsed = 0;
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});
