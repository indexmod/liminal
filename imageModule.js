const repo = "indexmod/liminal"; // Укажи свой репозиторий
const imgElement = document.getElementById("random-img");

let usedImages = []; // Массив для отслеживания использованных изображений

async function fetchRandomImage() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/`);
        const files = await response.json();

        const images = files.filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f.name)); // Фильтрация изображений по расширению

        if (images.length > 0) {
            // Сначала, если все изображения использованы, очищаем массив
            if (usedImages.length === images.length) {
                usedImages = [];
            }

            // Отфильтровываем уже использованные изображения
            const remainingImages = images.filter(image => !usedImages.includes(image.name));

            // Выбираем случайное изображение из оставшихся
            const randomImage = remainingImages[Math.floor(Math.random() * remainingImages.length)];

            // Добавляем это изображение в список использованных
            usedImages.push(randomImage.name);

            imgElement.src = randomImage.download_url;
        } else {
            console.error("Изображения не найдены");
        }
    } catch (error) {
        console.error("Ошибка загрузки изображений:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchRandomImage);
document.addEventListener("click", fetchRandomImage);
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") fetchRandomImage();
});
