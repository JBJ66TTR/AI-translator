const textInput = document.getElementById("textInput");
const language = document.getElementById("language");
const translateButton = document.getElementById("translateButton");
const result = document.getElementById("result");

const languages = {
    French: "fr",
    Spanish: "es",
    Arabic: "ar",
    German: "de",
    Italian: "it"
};

translateButton.addEventListener("click", async function () {

    const text = textInput.value.trim();
    const selectedLanguage = language.value;
    const targetLanguage = languages[selectedLanguage];

    if (text === "") {
        result.textContent = "Please enter some text first.";
        return;
    }

    result.textContent = "Translating...";

    try {
        const url =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Translation request failed.");
        }

        const data = await response.json();

        if (data.responseStatus !== 200) {
            throw new Error("Translation failed.");
        }

        result.textContent = data.responseData.translatedText;

    } catch (error) {
        result.textContent =
            "Sorry, the translation could not be completed. Please try again.";
    }
});
