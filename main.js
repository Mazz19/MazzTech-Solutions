// 1. Inizializzazione del motore IodineGBA
const iodine = new IodineGBA();
const canvas = document.getElementById('gba-canvas');

// Configurazione grafica: Iodine ha bisogno di sapere dove disegnare
iodine.attachCanvas(canvas);

// 2. Gestione del caricamento della ROM
document.getElementById('rom-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        const arrayBuffer = this.result;
        // Convertiamo il file in un formato leggibile dal core (Uint8Array)
        const romData = new Uint8Array(arrayBuffer);
        
        // Carichiamo e avviamo!
        iodine.loadROM(romData);
        iodine.play(); 
    };
    reader.readAsArrayBuffer(file);
});

// 3. Mappatura dei tasti (Input)
const keyMap = {
    38: 0, // Up -> Up
    40: 1, // Down -> Down
    37: 2, // Left -> Left
    39: 3, // Right -> Right
    90: 4, // Z -> A
    88: 5, // X -> B
    16: 6, // Shift -> Select
    13: 7, // Enter -> Start
    83: 8, // S -> R
    65: 9  // A -> L
};

window.onkeydown = (e) => {
    if (keyMap[e.keyCode] !== undefined) {
        iodine.keyDown(keyMap[e.keyCode]);
        e.preventDefault(); // Impedisce lo scroll della pagina con le frecce
    }
};

window.onkeyup = (e) => {
    if (keyMap[e.keyCode] !== undefined) {
        iodine.keyUp(keyMap[e.keyCode]);
    }
};
// Mappatura pulsanti a ID di IodineGBA
const touchMap = {
    "btn-up": 0,
    "btn-down": 1,
    "btn-left": 2,
    "btn-right": 3,
    "btn-a": 4,
    "btn-b": 5,
    "btn-select": 6,
    "btn-start": 7
};

// Funzione per collegare gli eventi
function setupTouchEvents() {
    Object.keys(touchMap).forEach(id => {
        const btn = document.getElementById(id);
        const gbaKey = touchMap[id];

        // Quando l'utente preme il pulsante
        const handlePress = (e) => {
            e.preventDefault();
            iodine.keyDown(gbaKey);
            btn.style.opacity = "0.5"; // Feedback visivo
        };

        // Quando l'utente rilascia il pulsante
        const handleRelease = (e) => {
            e.preventDefault();
            iodine.keyUp(gbaKey);
            btn.style.opacity = "1";
        };

        // Supporto sia per Touch che per Mouse
        btn.addEventListener('touchstart', handlePress);
        btn.addEventListener('touchend', handleRelease);
        btn.addEventListener('mousedown', handlePress);
        btn.addEventListener('mouseup', handleRelease);
    });
}

// Avvia la configurazione
setupTouchEvents();
