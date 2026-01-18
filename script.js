//your JS code here. If required.
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const video = document.querySelector(".video");
const timeDisplay = document.querySelector(".time-display");

const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let fakeDuration = 600;
let remainingTime = 600;
let timer = null;

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

// Start timer
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

// Play button logic (VERY SIMPLE FOR CYPRESS)
play.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    startTimer();
  } else {
    song.pause();
    clearInterval(timer);
  }
});

// Change sound
soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
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
