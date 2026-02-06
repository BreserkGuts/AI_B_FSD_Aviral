let remainingSeconds = 0;
let intervalId = null;
let isRunning = false;

function getElements() {
  const display = document.getElementById("timerDisplay");
  const hoursInput = document.getElementById("hoursInput");
  const minutesInput = document.getElementById("minutesInput");
  const secondsInput = document.getElementById("secondsInput");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  return {
    display,
    hoursInput,
    minutesInput,
    secondsInput,
    startBtn,
    pauseBtn,
    resetBtn,
  };
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

function updateDisplay() {
  const { display } = getElements();
  display.textContent = formatTime(remainingSeconds);
}

function setControlsState(running) {
  const { startBtn, pauseBtn, resetBtn, hoursInput, minutesInput, secondsInput } =
    getElements();

  isRunning = running;

  if (running) {
    startBtn.textContent = "Running...";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
  } else {
    startBtn.textContent = "Start";
    startBtn.disabled = remainingSeconds === 0;
    pauseBtn.disabled = true;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
  }
}

function readInputs() {
  const { hoursInput, minutesInput, secondsInput } = getElements();

  const hours = Math.max(0, Math.min(23, parseInt(hoursInput.value, 10) || 0));
  const minutes = Math.max(0, Math.min(59, parseInt(minutesInput.value, 10) || 0));
  const seconds = Math.max(0, Math.min(59, parseInt(secondsInput.value, 10) || 0));

  hoursInput.value = hours;
  minutesInput.value = minutes;
  secondsInput.value = seconds;

  return hours * 3600 + minutes * 60 + seconds;
}

function startTimer() {
  if (isRunning) return;

  if (remainingSeconds === 0) {
    remainingSeconds = readInputs();
  }

  if (remainingSeconds <= 0) {
    alert("Please set a time greater than 0.");
    return;
  }

  updateDisplay();
  setControlsState(true);

  intervalId = setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      updateDisplay();
      clearInterval(intervalId);
      intervalId = null;
      isRunning = false;
      alert("Time is up!");
      setControlsState(false);
      return;
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;

  const { startBtn, pauseBtn } = getElements();
  startBtn.textContent = "Resume";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  remainingSeconds = 0;
  isRunning = false;

  const { startBtn, pauseBtn, resetBtn, hoursInput, minutesInput, secondsInput } =
    getElements();

  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;

  updateDisplay();

  startBtn.textContent = "Start";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

window.addEventListener("DOMContentLoaded", () => {
  const { startBtn, pauseBtn, resetBtn, hoursInput, minutesInput, secondsInput } =
    getElements();

  updateDisplay();
  startBtn.disabled = false;

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  [hoursInput, minutesInput, secondsInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (!isRunning) {
        remainingSeconds = readInputs();
        updateDisplay();
      }
    });
  });
});

/*console.log("hello World");
console.log("KIET GROUP OF INSTITURIONS");
let a = 10;
let b = 10 ;
console.log(a+b);*/