document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Chiudi menu quando si clicca un link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Galleria immagini
    const galleria = document.querySelector('.galleria-grid');
    const immagini = [
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28',
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704',
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704',
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b'
    ];

    immagini.forEach(src => {
        const div = document.createElement('div');
        div.className = 'galleria-item';
        div.innerHTML = `<img src="${src}" alt="Lavoro completato">`;
        galleria.appendChild(div);
    });

    // Gestione form
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Qui puoi aggiungere la logica per l'invio del form
        alert('Grazie per averci contattato! Ti risponderemo presto.');
        form.reset();
    });

    // Animazione scroll
    function reveal() {
        const reveals = document.querySelectorAll('.servizio-card, .chi-siamo-content, .galleria-item');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
});