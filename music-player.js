const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const timeDisplay = document.getElementById("time");
const recordImage = document.getElementById("record-image");

let isPlaying = false;

// Play/Pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = "⏵";
        recordImage.style.animationPlayState = "paused";
    } else {
        audio.play();
        playBtn.textContent = "⏸";
        recordImage.style.animationPlayState = "running";
    }
    isPlaying = !isPlaying;
});

// Progress Bar
audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = (currentTime / duration) * 100;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});

// Drag Progress Bar
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Format Time (MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
