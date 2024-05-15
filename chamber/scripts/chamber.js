document.addEventListener("DOMContentLoaded", function () {
    let yearSpan = document.querySelector(".year");
    let lastModifiedParagraph = document.querySelector(".lastModified");

    let lastModified = new Date(document.lastModified);
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
    let formatDate = lastModified.toLocaleString("en-US", options);

    lastModifiedParagraph.textContent = "Last Modified: " + formatDate;

    let year = new Date().getFullYear();
    yearSpan.textContent = year;

    const visitInfo = document.querySelector(".visit-info");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    if (!lastVisit) {
        visitInfo.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.round((currentDate - lastVisit) / oneDay);
        if (daysSinceLastVisit === 0) {
            visitInfo.textContent = "Back so soon! Awesome!";
        } else {
            const message = daysSinceLastVisit === 1 ? "day" : "days";
            visitInfo.textContent = `You last visited ${daysSinceLastVisit} ${message} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentDate);
});

const nav = document.querySelector("nav");
const menuToggleContainer = document.querySelector(".menu-toggle-container");
const openMenuBtn = document.querySelector(".menu-open-btn");
const closeMenuBtn = document.querySelector(".menu-close-btn");

menuToggleContainer.addEventListener("click", () => {
    if (openMenuBtn.classList.contains("active")) {
        openMenuBtn.classList.remove("active");
        closeMenuBtn.classList.add("active");
        nav.classList.add("active");
    } else {
        openMenuBtn.classList.add("active");
        closeMenuBtn.classList.remove("active");
        nav.classList.remove("active");
    }
});

const overlays = document.querySelectorAll(".overlay");

overlays.forEach((overlay) => {
    const overlayCaption = overlay.firstElementChild.getAttribute("data-caption");
    overlay.style.setProperty("--overlay-content", `"${overlayCaption}"`);
});