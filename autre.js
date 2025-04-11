document.addEventListener("DOMContentLoaded", () => {
    const inputEl = document.getElementById("input");
    const infoTextEl = document.getElementById("info-text");
    const titleEl = document.getElementById("title");
    const meaningEl = document.getElementById("meaning");
    const audioEl = document.getElementById("audio");

    const fetchAPI = async (word) => { 
        try {
            infoTextEl.style.display = "block";
            infoTextEl.innerText = `Searching the meaning of "${word}"...`;

            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.title) {
                // Si l'API retourne une erreur (ex: mot introuvable)
                titleEl.innerText = "Not Found";
                meaningEl.innerText = `No results found for "${word}".`;
                audioEl.style.display = "none";
            } else {
                // Afficher la définition du mot
                titleEl.innerText = result[0].word;
                meaningEl.innerText = result[0].meanings[0].definitions[0].definition;

                // Vérifier si une prononciation est disponible
                const phonetics = result[0].phonetics.find(p => p.audio);
                if (phonetics) {
                    audioEl.src = phonetics.audio;
                    audioEl.style.display = "block";
                } else {
                    audioEl.style.display = "none";
                }
            }

            // Cacher le message de recherche
            infoTextEl.style.display = "none";
            
        } catch (error) {
            console.error("Error fetching data:", error);
            infoTextEl.innerText = "Error fetching data. Please try again.";
        }
    };

    inputEl.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            fetchAPI(e.target.value.trim());
        }
    });
});
