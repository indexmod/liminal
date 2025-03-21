const helpButton = document.getElementById("helpButton");
const popupMenu = document.getElementById("popupMenu");

helpButton.addEventListener("click", () => {
    popupMenu.classList.toggle("active");
});
