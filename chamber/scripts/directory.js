const imgContainer = document.querySelector(".image-container");
const localURL = "http://127.0.0.1:5501/chamber/data/members.json";

async function getMembers() {
    const response = await fetch(localURL);
    const data = await response.json();

    display(data.members);
}

getMembers();

function display(members) {
    const fragment = document.createDocumentFragment();

    members.forEach((member) => {
        const div = document.createElement("div");
        const img = document.createElement("img");

        div.setAttribute("class", "card");
        img.setAttribute("src", member.imgURL);
        img.setAttribute("alt", member.name);
        img.setAttribute("width", "300px");
        img.setAttribute("height", "300px");

        div.appendChild(img);

        fragment.appendChild(div);
    });

    imgContainer.appendChild(fragment);
}