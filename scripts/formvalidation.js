const pass1 = document.getElementById("password");
const pass2 = document.getElementById("password2");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
    if (pass1.value == pass2.value) {
        console.log("Password match");
    } else {
        window.alert("Password does not match");
        pass1.value = "";
        pass2.value = "";

        pass1.focus();
    }
});

const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("rating");

range.addEventListener("change", displayRatingValue);
range.addEventListener("input", displayRatingValue);

function displayRatingValue() {
    console.log(range.value);
    rangevalue.textContent = range.value;
}