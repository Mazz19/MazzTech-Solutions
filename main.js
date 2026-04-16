// --- 1. Inizializzazione ---
const iodine = new IodineGBA();
const canvas = document.getElementById('gba-canvas');
iodine.attachCanvas(canvas);

// Variabile per gestire il ciclo di gioco
let animationFrame;

// --- 2. Il Ciclo di Gioco (Fondamentale) ---
// Questa funzione forza il browser a chiedere a Iodine di processare i dati
function gameLoop() {
    if (iodine.isPlaying()) {
        iodine.runTimer(); // Esegue i calcoli necessari per un frame
        animationFrame = requestAnimationFrame(gameLoop);
    }
}

// --- 3. Caricamento ROM ---
const romInput = document.getElementById('rom-file');
romInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        try {
            const romData = new Uint8Array(this.result);
            
            // Carichiamo la ROM
            iodine.loadROM(romData);
            
            // Sblocchiamo l'audio prima di partire
            if (iodine.audio && iodine.audio.context) {
                iodine.audio.context.resume();
            }

            // Avviamo il motore e il ciclo grafico
            iodine.play();
            cancelAnimationFrame(animationFrame); // Pulizia se c'era un gioco prima
            gameLoop(); 
            
            console.log("Gioco avviato correttamente!");
        } catch (err) {
            console.error("Errore durante l'avvio della ROM:", err);
            alert("Errore nell'avvio del gioco. Controlla la console (F12).");
        }
    };
    reader.readAsArrayBuffer(file);
});

// --- 4. Controlli (Tastiera e Touch) ---
const keyMap = { 38:0, 40:1, 37:2, 39:3, 90:4, 88:5, 16:6, 13:7, 83:8, 65:9 };
const touchButtons = { "btn-up":0, "btn-down":1, "btn-left":2, "btn-right":3, "btn-a":4, "btn-b":5, "btn-select":6, "btn-start":7 };

function setupControls() {
    // Tastiera
    window.onkeydown = (e) => { if(keyMap[e.keyCode]!==undefined) { iodine.keyDown(keyMap[e.keyCode]); e.preventDefault(); }};
    window.onkeyup = (e) => { if(keyMap[e.keyCode]!==undefined) iodine.keyUp(keyMap[e.keyCode]); };

    // Touch
    Object.keys(touchButtons).forEach(id => {
        const btn = document.getElementById(id);
        const gbaKey = touchButtons[id];
        const press = (e) => { e.preventDefault(); iodine.keyDown(gbaKey); btn.style.opacity = "0.5"; };
        const release = (e) => { e.preventDefault(); iodine.keyUp(gbaKey); btn.style.opacity = "1"; };
        btn.addEventListener('touchstart', press, {passive: false});
        btn.addEventListener('touchend', release, {passive: false});
        btn.addEventListener('mousedown', press);
        btn.addEventListener('mouseup', release);
    });
}

setupControls();
