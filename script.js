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
    const target = languages[language.value];

    if (text === "") {
        result.textContent = "Please enter some text first.";
        return;
    }

    result.textContent = "Translating...";

    try {
        const response = await fetch(
            "https://broken-wind-47b6.maazouzsara66.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    q: text,
                    target: target
                })
            }
        );

        const data = await response.json();

     if (!response.ok || !data.translated_text) {
            throw new Error("Translation failed");
        }

        result.textContent = data.translated_text;

    } catch (error) {
        console.error(error);
        result.textContent =
            "Translation failed. Please try again.";
    }
});
