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