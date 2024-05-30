let viewStyle = "";

document.addEventListener("DOMContentLoaded", function () {
    let yearSpan = document.querySelector(".year");
    let visitInfo = document.querySelector(".visit-info");
    let lastVisit = localStorage.getItem("lastVisit");

    viewStyle = window.localStorage.getItem("view_style") || "grid";

    if (viewStyle === "grid") {
        document.querySelector(".grid").classList.add("activi");
    }
    if (viewStyle === "list") {
        document.querySelector(".list").classList.add("active");
    }

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

    const currentDate = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    if (!lastVisit) {
        visitInfo.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.round((currentDate - lastVisit) / oneDay);
        if (daysSinceLastVisit === 0) {
            if (visitInfo) visitInfo.textContent = "Back so soon! Awesome!";
        } else {
            const message = daysSinceLastVisit === 1 ? "day" : "days";
            if (visitInfo)
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

// Directory Page
const directoryMain = document.querySelector(".directory-main");
const gridBtn = document.querySelector(".grid");
const listBtn = document.querySelector(".list");

if (viewStyle === "grid") gridBtn.classList.add("active");
if (viewStyle === "list") listBtn.classList.add("active");

console.log({ viewStyle });

const localURL =
    "https://nengiamoni.github.io/wdd230/chamber/data/members.json";

async function getMembers() {
    const response = await fetch(localURL);
    const data = await response.json();

    console.log({ viewStyle });

    if (viewStyle === "grid") displayGrid(data.members);
    if (viewStyle === "list") displayList(data.members);
}

getMembers();

gridBtn.addEventListener("click", () => {
    if (!gridBtn.classList.contains("active")) {
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");

        viewStyle = "grid";
        getMembers();
    }
});

listBtn.addEventListener("click", () => {
    if (!listBtn.classList.contains("active")) {
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");

        viewStyle = "list";
        getMembers();
    }
});

function displayGrid(members) {
    const grid = document.querySelector(".image-container");
    const list = document.querySelector(".company-list");

    if (grid) return;

    window.localStorage.setItem("view_style", "grid");

    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "image-container");
    imgContainer.setAttribute("id", "image-container");
    const fragment = document.createDocumentFragment();

    const overlay = `<div class="member-info">
                     <button class="more-info">More info</button>
                   </div>`;

    members.forEach((member) => {
        const div = document.createElement("div");
        const img = document.createElement("img");

        div.setAttribute("class", "card");
        img.setAttribute(
            "src",
            `${member.imgURL}?name=${encodeURIComponent(
                member.name
            )}&address=${encodeURIComponent(
                member.address
            )}&telephone=${encodeURIComponent(
                member.telephone
            )}&website=${encodeURIComponent(
                member.website
            )}&imgURL=${encodeURIComponent(
                member.imgURL
            )}&membershipLevel=${encodeURIComponent(member.membershipLevel)}`
        );
        img.setAttribute("alt", member.name);
        img.setAttribute("width", "300px");
        img.setAttribute("height", "300px");

        div.innerHTML = overlay;
        div.appendChild(img);

        fragment.appendChild(div);
    });

    imgContainer.appendChild(fragment);
    if (list) directoryMain.removeChild(list);
    directoryMain.appendChild(imgContainer);

    document.querySelectorAll(".more-info").forEach((button) => {
        button.addEventListener("click", () => {
            const imgURLData = button.parentElement.parentElement
                .querySelector("img")
                .getAttribute("src")
                .split("?")[1];
            window.location.href = `directory-info.html?${imgURLData}`;
        });
    });
}

function displayList(member) {
    const list = document.querySelector(".company-list");
    const grid = document.querySelector(".image-container");

    if (list) return;

    window.localStorage.setItem("view_style", "list");

    const buttons = `<div class="toggle">
                    <button class="grid">Grid View</button>
                    <button class="list">List View</button>
                 </div>`;

    const listItem = `<li class="company-item">
                      <div class="company-details">
                        <strong></strong>
                        <p></p>
                        <a></a>
                      </div>
                   </li>`;

    const listContainer = document.createElement("ul");
    listContainer.setAttribute("class", "company-list");

    let listItems = "";

    member.forEach(() => (listItems += listItem));

    listContainer.innerHTML = listItems;

    if (grid) directoryMain.removeChild(grid);

    directoryMain.appendChild(listContainer);

    document
        .querySelectorAll(".company-details")
        .forEach((companyDetail, index) => {
            companyDetail.children[0].textContent = member[index].name;
            companyDetail.children[1].textContent = member[index].telephone;
            companyDetail.children[2].textContent = member[index].website;

            const linkHref = `directory-info.html?name=${encodeURIComponent(
                member[index].name
            )}&address=${encodeURIComponent(
                member[index].address
            )}&telephone=${encodeURIComponent(
                member[index].telephone
            )}&website=${encodeURIComponent(
                member[index].website
            )}&imgURL=${encodeURIComponent(
                member[index].imgURL
            )}&membershipLevel=${encodeURIComponent(member[index].membershipLevel)}`;

            companyDetail.children[2].setAttribute("href", linkHref);
        });
}