const repo = "indexmod/limi"; // Укажи свой репозиторий
const imgElement = document.getElementById("random-img");

async function fetchRandomImage() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/`);
        const files = await response.json();

        const images = files.filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f.name));

        if (images.length > 0) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
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
