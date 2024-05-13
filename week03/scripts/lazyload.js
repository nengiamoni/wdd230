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