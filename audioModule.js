const repo = "indexmod/liminal"; // Укажи свой репозиторий
const audioElement = new Audio();
let audioFiles = [];
let currentIndex = 0;

// Получение списка аудиофайлов из репозитория
async function fetchAudioFiles() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/`);
        const files = await response.json();

        // Фильтруем только аудиофайлы
        audioFiles = files.filter(f => /\.(mp3|wav|ogg)$/i.test(f.name));

        if (audioFiles.length > 0) {
            currentIndex = 0; // Сброс индекса
            playNextAudio();
        } else {
            console.error("Аудиофайлы не найдены");
        }
    } catch (error) {
        console.error("Ошибка загрузки аудиофайлов:", error);
    }
}

// Функция воспроизведения следующего аудиофайла
function playNextAudio() {
    if (audioFiles.length === 0) return;

    audioElement.src = audioFiles[currentIndex].download_url;
    audioElement.play().catch(error => console.error("Ошибка воспроизведения:", error));

    currentIndex = (currentIndex + 1) % audioFiles.length; // Зацикливание
}

// Обработчик клика, тапа или нажатия пробела
function handleInteraction(event) {
    if (event.type === "keydown" && event.code !== "Space") return;
    playNextAudio();
}

// Загружаем аудиофайлы при старте
document.addEventListener("DOMContentLoaded", fetchAudioFiles);

// Добавляем обработчики событий
document.addEventListener("click", handleInteraction);
document.addEventListener("touchstart", handleInteraction);
document.addEventListener("keydown", handleInteraction);
