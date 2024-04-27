// Get the current year and update the footer
const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Get the last modified date and update the second paragraph in the footer
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = "Last modified: " + document.lastModified;