document.addEventListener("DOMContentLoaded", function () {
    let yearSpan = document.getElementById("year");
    let lastModifiedParagraph = document.getElementById("lastModified");

    let ultimaModificacion = new Date(document.lastModified);
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
    };
    let fechaFormato = ultimaModificacion.toLocaleString("en-US", options);

    lastModifiedParagraph.textContent = "Last Modified: " + fechaFormato;

    let year = new Date().getFullYear();
    yearSpan.textContent = year;
});

// Menu

const menuButton = document.getElementById("hamburger-menu");
const menuItems = document.getElementById("menu");

// Add event listener to toggle menu visibility and change button icon
menuButton.addEventListener("click", function () {
    if (menuItems.style.display === "block") {
        menuItems.style.display = "none";
        menuButton.classList.remove("close");
        menuButton.classList.add("open");
    } else {
        menuItems.style.display = "block";
        menuButton.classList.remove("open");
        menuButton.classList.add("close");
    }
});

const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");
const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
const h1 = document.querySelector("h1");

modeButton.addEventListener("click", () => {
    if (modeButton.textContent.includes("✨")) {
        main.style.background = "#000";
        main.style.color = "#fff";
        h1.style.color = "#fff";
        card1.style.background = "#261f1f";
        card2.style.background = "#261f1f";
        document.body.style.background = "black";
        modeButton.textContent = "💡";
    } else {
        main.style.background = "#eee";
        main.style.color = "#000";
        h1.style.color = "#000";
        document.body.style.background = "white";
        card1.style.background = "white";
        card2.style.background = "white";
        modeButton.textContent = "✨";
    }
});

const visitsDisplay = document.querySelector(".visits");

let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

if (numVisits !== 0) {
    visitsDisplay.textContent = `Number of visits: ${numVisits}`;
} else {
    visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
}

numVisits++;

localStorage.setItem("numVisits-ls", numVisits);