const dinosaurio = document.getElementById("dinosaurio");
const obstaculo1 = document.getElementById("obstaculo1");
const obstaculo2 = document.getElementById("obstaculo2");
const puntuacionSpan = document.getElementById("puntos");
let puntos = 0;
let juegoEnMarcha = false;
let timerObstaculos;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !juegoEnMarcha) {
        iniciarJuego();
    } else if (event.code === "Space") {
        saltar();
    }
});

function iniciarJuego() {
    juegoEnMarcha = true;
    timerObstaculos = setInterval(moverObstaculos, 20);
    setInterval(actualizarPuntuacion, 100);
}

function saltar() {
    if (!dinosaurio.classList.contains("saltando")) {
        dinosaurio.classList.add("saltando");
        setTimeout(function() {
            dinosaurio.classList.remove("saltando");
        }, 300);
    }
}

function actualizarPuntuacion() {
    if (juegoEnMarcha) {
        puntos++;
        puntuacionSpan.textContent = puntos;
    }
}

function moverObstaculos() {
    const obstaculo1Left = parseInt(window.getComputedStyle(obstaculo1).getPropertyValue("left"));
    const obstaculo2Left = parseInt(window.getComputedStyle(obstaculo2).getPropertyValue("left"));

    if (obstaculo1Left <= -30) {
        obstaculo1.style.left = "100%";
    } else {
        obstaculo1.style.left = obstaculo1Left - 5 + "px";
    }

    if (obstaculo2Left <= -30) {
        obstaculo2.style.left = "100%";
    } else {
        obstaculo2.style.left = obstaculo2Left - 5 + "px";
    }

    if (detectarColision()) {
        finDelJuego();
    }
}

function detectarColision() {
    const dinosaurioRect = dinosaurio.getBoundingClientRect();
    const obstaculo1Rect = obstaculo1.getBoundingClientRect();
    const obstaculo2Rect = obstaculo2.getBoundingClientRect();

    return (
        dinosaurioRect.bottom >= obstaculo1Rect.top &&
        dinosaurioRect.top <= obstaculo1Rect.bottom &&
        dinosaurioRect.right >= obstaculo1Rect.left &&
        dinosaurioRect.left <= obstaculo1Rect.right
    ) || (
        dinosaurioRect.bottom >= obstaculo2Rect.top &&
        dinosaurioRect.top <= obstaculo2Rect.bottom &&
        dinosaurioRect.right >= obstaculo2Rect.left &&
        dinosaurioRect.left <= obstaculo2Rect.right
    );
}

function finDelJuego() {
    clearInterval(timerObstaculos);
    alert("¡Has perdido! Puntuación: " + puntos);
    reiniciarJuego();
}

function reiniciarJuego() {
    puntos = 0;
    puntuacionSpan.textContent = puntos;
    obstaculo1.style.left = "100%";
    obstaculo2.style.left = "100%";
    juegoEnMarcha = false;
}
