(() => {
    const repo = "indexmod/liminal"; // Укажи свой репозиторий
    let audioFiles = [];
    let currentAudioIndex = 0;
    let audioElement = new Audio();

    async function fetchAudioFiles() {
        try {
            const response = await fetch(`https://api.github.com/repos/${repo}/contents/`);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const files = await response.json();
            if (!Array.isArray(files)) throw new Error("Некорректный ответ от API");

            audioFiles = files
                .filter(f => /\.(mp3|wav|ogg|m4a)$/i.test(f.name))
                .map(f => f.download_url);

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

        audioElement.src = audioFiles[currentAudioIndex];
        audioElement.play().catch(err => console.error("Ошибка воспроизведения:", err));

        currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
    }

    document.addEventListener("DOMContentLoaded", fetchAudioFiles);
    document.addEventListener("click", playNextAudio);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") playNextAudio();
    });
})();
