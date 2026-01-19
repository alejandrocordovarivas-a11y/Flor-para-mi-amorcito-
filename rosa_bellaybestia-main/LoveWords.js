// Frases que quieras mostrar (puedes cambiar libremente)
const LOVE_WORDS = [
    "Te amo ❤️",
    "Eres mi lugar seguro",
    "Mi corazón es tuyo",
    "Siempre tú",
    "Gracias por existir",
    "Te elegiría mil veces"
];

// Tiempo entre palabras (coincide bien con pétalos)
const WORD_INTERVAL = 5000;

let wordIndex = 0;

function showNextWord() {
    if (wordIndex >= LOVE_WORDS.length) return;

    const container = document.getElementById("love-words");
    const word = document.createElement("div");

    word.className = "love-word";
    word.textContent = LOVE_WORDS[wordIndex];

    container.appendChild(word);

    // Eliminar luego de la animación
    setTimeout(() => {
        word.remove();
    }, 5000);

    wordIndex++;
}

// Iniciar junto con la caída de pétalos
setTimeout(() => {
    showNextWord();
    setInterval(showNextWord, WORD_INTERVAL);
}, 1000);