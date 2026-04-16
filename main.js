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
