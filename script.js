//your JS code here. If required.
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const video = document.querySelector(".video");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let fakeDuration = 600;

// Play / Pause
play.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    video.play();
  } else {
    song.pause();
    video.pause();
  }
});

// Switch Sound & Video
soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    song.play();
    video.play();
  });
});

// Change Time
timeButtons.forEach(button => {
  button.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = formatTime(fakeDuration);
  });
});

// Update Timer
song.ontimeupdate = function () {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;

  timeDisplay.textContent = formatTime(elapsed);

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
  }
};

// Format Time
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}
