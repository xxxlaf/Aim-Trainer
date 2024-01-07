function SetDefaults() {
    if (localStorage.getItem("app color-mode") === null) {
        localStorage.setItem("app color-mode", "light");
    }
}

function SetColorMode() {
    if (localStorage.getItem("app color-mode") === "light") {
        document.documentElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("app color-mode", "light");
    } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("app color-mode", "dark");
    }
}

function ChangeColorMode() {
    if (localStorage.getItem("app color-mode") === "light") {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("app color-mode", "dark");
        btn_color_mode.className = "btn btn-light";
        btn_color_mode.innerText = "Light Mode";
    } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("app color-mode", "light");
        btn_color_mode.className = "btn btn-dark";
        btn_color_mode.innerText = "Dark Mode";
    }
}

// get buttons
const btn_play = document.getElementById("btn play");
const btn_settings = document.getElementById("btn settings");
const btn_color_mode = document.getElementById("btn color-mode");

btn_play.addEventListener("click", function() {
    location.href = "game.html";
});

btn_color_mode.addEventListener("click", function() {
    ChangeColorMode();
});

SetDefaults();