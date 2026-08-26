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

        const response = await fetch(
            "https://libretranslate.com/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    q: text,
                    source: "auto",
                    target: targetLanguage,
                    format: "text"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Translation request failed");
        }

        const data = await response.json();

        if (!data.translatedText) {
            throw new Error("No translation received");
        }

        result.textContent = data.translatedText;

    } catch (error) {

        console.error(error);

        result.textContent =
            "Sorry, the translation service is currently unavailable.";
    }
});
