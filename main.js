// --- 1. Inizializzazione Core ---
const iodine = new IodineGBA();
const canvas = document.getElementById('gba-canvas');
iodine.attachCanvas(canvas);

// --- 2. Gestione Caricamento ROM ---
const romInput = document.getElementById('rom-file');
romInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        const romData = new Uint8Array(this.result);
        iodine.loadROM(romData);
        iodine.play();
        console.log("Gioco avviato!");
    };
    reader.readAsArrayBuffer(file);
});

// --- 3. Mappatura Tastiera (PC) ---
const keyMap = {
    38: 0, 40: 1, 37: 2, 39: 3, // Frecce
    90: 4, 88: 5,               // Z, X
    16: 6, 13: 7,               // Shift, Enter
    83: 8, 65: 9                // S, A
};

window.addEventListener('keydown', (e) => {
    if (keyMap[e.keyCode] !== undefined) {
        iodine.keyDown(keyMap[e.keyCode]);
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    if (keyMap[e.keyCode] !== undefined) {
        iodine.keyUp(keyMap[e.keyCode]);
    }
});

// --- 4. Mappatura Touch (Mobile) ---
const touchButtons = {
    "btn-up": 0, "btn-down": 1, "btn-left": 2, "btn-right": 3,
    "btn-a": 4, "btn-b": 5, "btn-select": 6, "btn-start": 7
};

function setupMobileControls() {
    Object.keys(touchButtons).forEach(id => {
        const btn = document.getElementById(id);
        const gbaKey = touchButtons[id];

        const press = (e) => {
            e.preventDefault();
            iodine.keyDown(gbaKey);
            btn.style.filter = "brightness(0.7)";
        };

        const release = (e) => {
            e.preventDefault();
            iodine.keyUp(gbaKey);
            btn.style.filter = "brightness(1)";
        };

        // Eventi Touch
        btn.addEventListener('touchstart', press, {passive: false});
        btn.addEventListener('touchend', release, {passive: false});
        // Eventi Mouse (per test su PC)
        btn.addEventListener('mousedown', press);
        btn.addEventListener('mouseup', release);
    });
}

setupMobileControls();

// --- 5. Ottimizzazione Audio ---
// I browser bloccano l'audio finché l'utente non interagisce.
// IodineGBA gestisce l'audio internamente, ma serve un'interazione per sbloccarlo.
window.addEventListener('touchstart', () => {
    if (iodine.audio) iodine.audio.resumeContext();
}, {once: true});
