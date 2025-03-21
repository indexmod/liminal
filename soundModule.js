const audioElement = new Audio();
let currentAudioIndex = 0;
let audioFiles = [];

async function fetchAudioFiles() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/`);
        const files = await response.json();

        // Фильтруем только аудиофайлы
        audioFiles = files.filter(f => /\.(mp3|wav|ogg|m4a)$/i.test(f.name));

        if (audioFiles.length > 0) {
            playNextAudio();
        } else {
            console.error("Аудиофайлы не найдены");
        }
    } catch (error) {
        console.error("Ошибка загрузки аудио:", error);
    }
}

function playNextAudio() {
    if (audioFiles.length === 0) return;

    audioElement.src = audioFiles[currentAudioIndex].download_url;
    audioElement.play();

    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
}

// Запуск при загрузке страницы и по событиям
document.addEventListener("DOMContentLoaded", fetchAudioFiles);
document.addEventListener("click", playNextAudio);
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") playNextAudio();
});
