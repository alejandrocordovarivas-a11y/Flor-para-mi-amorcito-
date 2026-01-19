const texts = [
    "Mi corazón es tuyo",
    "Te amo mucho",
    "Eres parte de mí",
    "Siempre contigo",
    "Papoi 💖"
];

const topSlot = document.querySelector(".slot-top");
const bottomSlot = document.querySelector(".slot-bottom");

let index = 0;
let showTop = false;

function animateText() {
    topSlot.classList.remove("active");
    bottomSlot.classList.remove("active");

    setTimeout(() => {
        if (showTop) {
            topSlot.textContent = texts[index];
            topSlot.classList.add("active");
        } else {
            bottomSlot.textContent = texts[index];
            bottomSlot.classList.add("active");
        }

        showTop = !showTop;
        index = (index + 1) % texts.length;
    }, 500);
}

animateText();
setInterval(animateText, 3500);