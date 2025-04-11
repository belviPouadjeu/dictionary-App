const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");

const fetchAPI = async (word) => { 
    try {
        infoTextEl.style.display = "block";
        infoTextEl.innerText = `Searching the meaning of "${word}"...`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const result = await response.json();
        
        console.log(result);

        // Cacher le message après avoir affiché le résultat
        infoTextEl.style.display = "none";
        
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
