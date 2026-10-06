const catwayNumber = document.getElementById('catway-number');
const catwayType = document.getElementById('catway-type');
const catwayState = document.getElementById('catway-state');
const catwayMessage = document.getElementById('catway-message');


// Récupération du paramètre ?id= présent dans l'URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');


const loadCatway = async () => {

    // Vérifie qu'un numéro a bien été fourni
    if (!id) {
        catwayMessage.textContent =
            'Aucun numéro de catway fourni';

        return;
    }


    try {

        const response = await fetch(`/catways/${id}`);


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        if (response.status === 404) {
            catwayMessage.textContent =
                'Catway introuvable';

            return;
        }


        if (!response.ok) {
            catwayMessage.textContent =
                'Impossible de récupérer le catway';

            return;
        }


        const catway = await response.json();


        catwayNumber.textContent =
            catway.catwayNumber;

        catwayType.textContent =
            catway.type;

        catwayState.textContent =
            catway.catwayState;


    } catch (error) {

        catwayMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }
};


loadCatway();