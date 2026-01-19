const petals = [];

function createPetals() {
    for (let i = PETAL_DATA.length - 1; i >= 0; i--) {
        const petalData = PETAL_DATA[i];
        const petal = document.createElement("div");
        petal.classList.add("petal");
        const topPos = `calc(50vh + ${petalData.y_relative + POSITION_BASE.y}px)`;
        const leftPos = `calc(50vw + ${petalData.x_relative + POSITION_BASE.x}px)`;
        petal.setAttribute("style", `top: ${topPos}; left: ${leftPos}; width: ${petalData.width}px; height: ${petalData.height}px;`);
        const img = document.createElement("img");
        img.src = petalData.path;
        petal.appendChild(img);
        document.body.appendChild(petal);
        const rect = petal.getBoundingClientRect();
        petals.push({
            physics: new PetalPhysics(petal, rect.left, rect.top, i),
            index: i+1
        });
    }
}

// NUEVA FUNCIÓN: 300 Estrellas con brillo
function generarCieloEstrellado() {
    const starfield = document.querySelector(".starfield");
    for (let i = 0; i < 300; i++) {
        const star = document.createElement("div");
        const size = Math.random() * 3 + 1;
        star.style.position = "absolute";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.backgroundColor = "white";
        star.style.borderRadius = "50%";
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.opacity = Math.random();
        star.style.boxShadow = "0 0 10px white";
        starfield.appendChild(star);
    }
}

function startFallingSequence() {
    let currentIndex = 0;
    function triggerNextPetal() {
        if (currentIndex < petals.length) {
            const petalToFall = petals.find(p => p.index === currentIndex + 1);
            if (petalToFall) petalToFall.physics.start();
            currentIndex++;
            if (currentIndex < petals.length) setTimeout(triggerNextPetal, TIEMPO_ENTRE_PETALOS);
        }
    }
    triggerNextPetal();
}

function startTextSequence() {
    const texts = document.querySelectorAll(".text-item");
    const overlay = document.querySelector(".overlay-dark");
    let currentIndex = 0;

    function showNext() {
        if (currentIndex > 0 && currentIndex < texts.length) {
            texts[currentIndex - 1].classList.remove("active");
        }
        if (currentIndex < texts.length) {
            overlay.style.opacity = "1"; // Aquí se activa la opacidad de la capa oscura
            texts[currentIndex].classList.add("active");
            if (currentIndex === texts.length - 1) {
                setInterval(crearFuegoArtificial, 500); // Más seguidos (cada medio segundo)
            } else {
                currentIndex++;
                setTimeout(showNext, 5000);
            }
        }
    }
    showNext();
}

function crearFuegoArtificial() {
    const container = document.getElementById("fireworks-container");
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6);
    const colores = ['#ff006a', '#ffcc00', '#00ffcc', '#ffffff', '#00aaff', '#ff00ff'];
    const color = colores[Math.floor(Math.random() * colores.length)];

    for (let i = 0; i < 60; i++) { // 60 partículas por explosión
        const particle = document.createElement("div");
        particle.classList.add("firework-particle");
        particle.style.backgroundColor = color;
        particle.style.color = color;
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        container.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 4; // Más velocidad
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let opacity = 1;
        let px = x; let py = y;

        function animate() {
            px += vx;
            py += vy + 0.05;
            opacity -= 0.008; // Duran más tiempo brillando
            particle.style.left = px + "px";
            particle.style.top = py + "px";
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${opacity * 1.5})`; 

            if (opacity > 0) requestAnimationFrame(animate);
            else particle.remove();
        }
        animate();
    }
}

function crearCorazonExplosion(x, y) {
    const container = document.getElementById("fireworks-container");
    const color = '#ff006a'; // Color rosa potente para el corazón
    const totalParticulas = 80; // Más partículas para que se note la forma

    for (let i = 0; i < totalParticulas; i++) {
        const particle = document.createElement("div");
        particle.classList.add("firework-particle");
        particle.style.backgroundColor = color;
        particle.style.color = color;
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        container.appendChild(particle);

        // Ecuación paramétrica del corazón
        const angle = (i / totalParticulas) * Math.PI * 2;
        
        // Matemáticas para la forma de corazón
        const heartX = 16 * Math.pow(Math.sin(angle), 3);
        const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        
        const velocity = Math.random() * 0.5 + 1.5; // Velocidad de expansión
        const vx = heartX * velocity;
        const vy = heartY * velocity;

        let opacity = 1;
        let px = x;
        let py = y;

        function animate() {
            px += vx;
            py += vy;
            opacity -= 0.008; // El corazón dura un poco más en pantalla
            
            particle.style.left = px + "px";
            particle.style.top = py + "px";
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${opacity * 2})`; 

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        animate();
    }
}

// --- ESCUCHADOR DE CLICS / TAPS ---
document.addEventListener('mousedown', (e) => {
    crearCorazonExplosion(e.clientX, e.clientY);
});

// Para dispositivos móviles (taps)
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    crearCorazonExplosion(touch.clientX, touch.clientY);
});

// --- ACTUALIZAR EL INIT ---
function init() {
    generarCieloEstrellado();
    createPetals();
    enhanceGlass();
    setTimeout(startFallingSequence, 1000);
    setTimeout(startTextSequence, 2000);
}

document.addEventListener('DOMContentLoaded', init);