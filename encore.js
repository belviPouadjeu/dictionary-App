const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

const fetchAPI = async (word) => { 
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"...`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const result = await response.json();
        
        console.log(result);
        if (result.title) {
            // Si l'API retourne une erreur (ex: mot introuvable)
            //titleEl.innerText = "Not Found";
            titleEl.innerText = word;
            meaningEl.innerText = `No results found for "${word}".`;
            audioEl.style.display = "none";
        } else {
            // Afficher la définition du mot
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex";
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio

        }


        // Cacher le message après avoir affiché le résultat
        /* infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "block";
        titleEl.innerText = result[0].word;
        meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
        audioEl.src = result[0].phonetics[0].audio */
        
    } catch (error) {
        console.error("Error fetching data:", error);
        infoTextEl.innerText = "Error fetching data. Please try again.";
    }
};

inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
        fetchAPI(e.target.value.trim());
    }
});
