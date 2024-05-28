document.addEventListener("DOMContentLoaded", () => {
    const membershipIcon = { Bronze: "🥉", Silver: "🥈", Gold: "🥇" };

    const queryParams = getQueryParams();
    const name = queryParams.name;
    const address = queryParams.address;
    const telephone = queryParams.telephone;
    const website = queryParams.website;
    const imgURL = queryParams.imgURL;
    const membershipLevel = queryParams.membershipLevel;

    document.querySelector(".directory-info .name").textContent = name;
    document.querySelector(".membershipLevel p").textContent =
        membershipIcon[membershipLevel];
    document.querySelector(".telephone p").textContent = telephone;
    document.querySelector(".website p").textContent = website;
    document.querySelector(".address p").textContent = address;
    const domImage = document.querySelector(".directory-info img");

    domImage.setAttribute("src", imgURL);
    domImage.setAttribute("alt", name);
});

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const paramPairs = queryString.split("&");

    paramPairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });

    return params;
}