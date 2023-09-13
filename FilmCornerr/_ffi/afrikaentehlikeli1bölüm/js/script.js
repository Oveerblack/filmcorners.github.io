const video = document.getElementById('video-player');
const playPauseButton = document.getElementById('play-pause');
const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');
const qualitySelect = document.getElementById('quality');
const volumeControl = document.getElementById('volume');
const subtitleSelect = document.getElementById('subtitles');
const fullscreenButton = document.querySelector('.fullscreen-button');
const previewVideo = document.getElementById('preview-video');
const previewOverlay = document.querySelector('.preview-overlay');
const timeSlider = document.getElementById('time-slider');
const timeTooltip = document.getElementById('time-tooltip');

video.addEventListener('loadedmetadata', () => {
    const duration = video.duration;
    timeSlider.max = duration;
});

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    timeSlider.value = currentTime;

    // Zamanı biçimlendir ve zaman çubuğu üzerinde göster
    const formattedTime = formatTime(currentTime);
    timeTooltip.textContent = formattedTime;
    const sliderWidth = timeSlider.clientWidth;
    const thumbWidth = timeSlider.offsetWidth;
    const thumbLeft = (sliderWidth - thumbWidth) * (currentTime / video.duration);
    timeTooltip.style.left = thumbLeft + 'px';
});

timeSlider.addEventListener('input', () => {
    const newTime = timeSlider.value;
    video.currentTime = newTime;
});

// Zaman biçimlendirme işlevi (saniyeyi dakika:saniye biçimine dönüştürür)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.innerHTML = '&#10074;&#10074;';
    } else {
        video.pause();
        playPauseButton.innerHTML = '&#9658;';
    }
});

rewindButton.addEventListener('click', () => {
    video.currentTime -= 10;
});

forwardButton.addEventListener('click', () => {
    video.currentTime += 10;
});

volumeControl.addEventListener('input', () => {
    video.volume = volumeControl.value;
});

fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari ve Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
});

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const previewTime = currentTime + 5; // 5 saniye önizleme
    previewVideo.currentTime = previewTime;
});

video.addEventListener('mousemove', () => {
    previewOverlay.style.display = 'block';
});

video.addEventListener('mouseout', () => {
    previewOverlay.style.display = 'none';
});
