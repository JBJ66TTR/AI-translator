const textInput = document.getElementById("textInput");
const language = document.getElementById("language");
const translateButton = document.getElementById("translateButton");
const result = document.getElementById("result");

translateButton.addEventListener("click", function () {

    const text = textInput.value.trim();
    const selectedLanguage = language.value;

    if (text === "") {
        result.textContent = "Please enter some text first.";
        return;
    }

    result.textContent =
        `Your text will be translated into ${selectedLanguage}.`;
});
