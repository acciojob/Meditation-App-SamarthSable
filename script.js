//your JS code here. If required.
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

song.preload = "auto";   

let fakeDuration = 600;
let remainingTime = 600;
let timer = null;

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingTime);
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      song.pause();
    }
  }, 1000);
}


play.addEventListener("click", () => {
  if (song.paused) {
    song.load();
    song.play().then(() => {
      startTimer();
    }).catch(() => {});
  } else {
    song.pause();
    clearInterval(timer);
  }
});

updateDisplay();
