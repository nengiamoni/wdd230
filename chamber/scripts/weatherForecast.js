document.addEventListener("DOMContentLoaded", () => {
    let banner = document.getElementById("banner");
    document
        .getElementById("closeBanner")
        .addEventListener("click", () => (banner.style.display = "none"));

    getMembers();
    showBannerOnSpecificDays();
});

const membersLocalURL = "../chamber/data/members.json";

async function getMembers() {
    const response = await fetch(membersLocalURL);
    const data = await response.json();

    const silverGoldMembers = data.members.filter(
        (member) =>
            member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );

    let members = "";

    for (let i = 0; i < 3; i++) {
        const randomIndex = getRandomNumber(silverGoldMembers.length);
        const randomMember = silverGoldMembers[randomIndex];

        members += createMember(randomMember);
    }

    display(members);
}

function getRandomNumber(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

function display(members) {
    document.querySelector(".member-spotlights").innerHTML = members;
}

function createMember({
    name,
    membershipLevel: level,
    telephone: phone,
    website,
}) {
    const levelIcon = { Gold: "🥇", Silver: "🥈" };

    return `<div class="members">
              <h3>${name}</h3>
              <p>Membership Level: ${levelIcon[level]}</p>
              <p>${phone}</p>
              <p>${website}</p>
           </div>`;
}

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector(".weather-desc");
const humidity = document.querySelector(".humidity-p");
const feelLike = document.querySelector(".feels-like");
const day1 = document.querySelector(".day-one");
const day2 = document.querySelector(".day-two");
const day3 = document.querySelector(".day-three");

const coord = { lat: 7.34, lon: 3.84 };
const dayCount = 3;
const appid = "b92da245303a816497b90a4eeb90ddf5";

const forecastURL =
    "https://api.weatherapi.com/v1/forecast.json?q=7.34,3.84&days=3&key=25904d312a5a4a95ab0225050242805&hour=12";

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=b92da245303a816497b90a4eeb90ddf5&units=metric`;

async function apiFetch() {
    try {
        const currentResponse = fetch(currentURL);
        const forecastResponse = fetch(forecastURL);

        const responses = await Promise.all([currentResponse, forecastResponse]);

        if (responses[0].ok && responses[1].ok) {
            const currentData = await responses[0].json();
            const forecastData = await responses[1].json();

            displayResults(currentData, forecastData);
        } else {
            throw Error(await responses[0].text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(currentData, forecastData) {
    currentTemp.innerHTML = `${Math.round(currentData.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    let desc = currentData.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    weatherDesc.textContent = desc;
    humidity.textContent = `${currentData.main.humidity}%`;
    feelLike.innerHTML = `${Math.round(currentData.main.feels_like)}&deg;C`;

    const forecastArray = forecastData.forecast.forecastday;

    day1.innerHTML = `${Math.round(forecastArray[0].day.avgtemp_c)}&deg;C |`;
    day2.innerHTML = `${Math.round(forecastArray[1].day.avgtemp_c)}&deg;C |`;
    day3.innerHTML = `${Math.round(forecastArray[2].day.avgtemp_c)}&deg;C`;
}

function showBannerOnSpecificDays() {
    let currentDay = new Date().getDay();

    if (currentDay === 1 || currentDay === 2 || currentDay === 3) {
        banner.style.display = "block";
    }
}