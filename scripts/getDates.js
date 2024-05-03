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