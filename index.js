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
        infoTextEl.innerText = `Searching the meaning of "${word}"`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const result = await response.json();
        
        console.log(result);
        
        if (result.title) {
            titleEl.innerText = word;
            meaningEl.innerHTML = `<p style="color: red;">No results found for "${word}".</p>`;
            audioEl.style.display = "none";
        } else {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = result[0].word;

            // Récupérer la prononciation
            const phonetic = result[0].phonetics.find(p => p.audio);
            if (phonetic) {
                audioEl.src = phonetic.audio;
                audioEl.style.display = "block";
            } else {
                audioEl.style.display = "none";
            }

            // Récupérer toutes les significations
            let meaningsHTML = "";
            result[0].meanings.forEach(meaning => {
                meaningsHTML += `<h3>${meaning.partOfSpeech}</h3>`;

                meaning.definitions.forEach((def, index) => {
                    meaningsHTML += `<p><strong>Definition ${index + 1}:</strong> ${def.definition}</p>`;
                    
                    if (def.example) {
                        meaningsHTML += `<p><em>Example:</em> "${def.example}"</p>`;
                    }

                    if (def.synonyms && def.synonyms.length > 0) {
                        meaningsHTML += `<p><strong>Synonyms:</strong> ${def.synonyms.join(", ")}</p>`;
                    }

                    if (def.antonyms && def.antonyms.length > 0) {
                        meaningsHTML += `<p><strong>Antonyms:</strong> ${def.antonyms.join(", ")}</p>`;
                    }
                });
            });

            meaningEl.innerHTML = meaningsHTML;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        infoTextEl.innerText = "An error happened. Please try again.";
    }
};

inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
        fetchAPI(e.target.value.trim());
    }
});
