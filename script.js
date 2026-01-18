//your JS code here. If required.
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const video = document.querySelector(".video");
const timeDisplay = document.querySelector(".time-display");

const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let fakeDuration = 600;
let interval = null;
let remainingTime = fakeDuration;

// Format time
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}

// Update display
function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingTime);
}

// Start Timer
function startTimer() {
  clearInterval(interval);

  interval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      song.pause();
      video.pause();
      clearInterval(interval);
    }
  }, 1000);
}

// Play / Pause
play.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    video.play();
    startTimer();
  } else {
    song.pause();
    video.pause();
    clearInterval(interval);
  }
});

// Switch sounds
soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    song.play();
    video.play();
  });
});

// Change time
timeButtons.forEach(button => {
  button.addEventListener("click", function () {
    fakeDuration = parseInt(this.getAttribute("data-time"));
    remainingTime = fakeDuration;
    updateDisplay();
  });
});

// Initial display
updateDisplay();
