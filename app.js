// Selezioniamo gli elementi dalla pagina
const canvas = document.getElementById('screen');
const romInput = document.getElementById('rom-upload');

// Inizializziamo l'oggetto GBA (usando una libreria come GBA.js)
const gba = new GameBoyAdvance();

// Colleghiamo l'emulatore al nostro canvas
gba.setCanvas(canvas);

// Funzione per caricare ed eseguire la ROM
romInput.onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Carichiamo i dati della ROM nell'emulatore
            gba.loadRomFromFile(file, (result) => {
                if (result) {
                    console.log("ROM Caricata con successo!");
                    gba.run(); // Avvia l'emulazione
                } else {
                    alert("Errore nel caricamento della ROM.");
                }
            });
        };
        
        reader.readAsArrayBuffer(file);
    }
};
