const linksURL = "data/links.json";

async function getLinksData() {
    const response = await fetch(linksURL);
    const data = await response.json();

    displayLinks(data.weeks);
}

getLinksData();

const ul = document.getElementById("learning-activities");

function displayLinks(weeks) {
    const htmlFragment = document.createDocumentFragment();

    weeks.forEach((weekInfo) => {
        const li = document.createElement("li");
        const weekNumber = document.createTextNode(weekInfo.week);
        li.appendChild(weekNumber);

        weekInfo.links.forEach((linkInfo, index) => {
            const link = createLink(linkInfo.url, linkInfo.title);

            if (index > 0) {
                li.appendChild(document.createTextNode(" | "));
            }

            li.appendChild(link);
        });
        htmlFragment.appendChild(li);
    });
    ul.appendChild(htmlFragment);
}

function createLink(href, text) {
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", href);
    link.textContent = text;
    return link;
}