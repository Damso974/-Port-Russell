const catwayNumber =
    document.getElementById('catway-number');

const clientName =
    document.getElementById('client-name');

const boatName =
    document.getElementById('boat-name');

const checkIn =
    document.getElementById('check-in');

const checkOut =
    document.getElementById('check-out');

const reservationMessage =
    document.getElementById('reservation-message');


// Récupération des paramètres présents dans l'URL
const params =
    new URLSearchParams(window.location.search);

const catway =
    params.get('catway');

const reservationId =
    params.get('id');


const loadReservation = async () => {

    if (!catway || !reservationId) {

        reservationMessage.textContent =
            'Informations de réservation manquantes';

        return;
    }


    try {

        const response = await fetch(
            `/catways/${catway}/reservations/${reservationId}`
        );


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        if (response.status === 404) {

            reservationMessage.textContent =
                'Réservation introuvable';

            return;
        }


        if (!response.ok) {

            reservationMessage.textContent =
                'Impossible de récupérer la réservation';

            return;
        }


        const reservation =
            await response.json();


        catwayNumber.textContent =
            reservation.catwayNumber;

        clientName.textContent =
            reservation.clientName;

        boatName.textContent =
            reservation.boatName;

        checkIn.textContent =
            new Date(reservation.checkIn)
                .toLocaleDateString('fr-FR');

        checkOut.textContent =
            new Date(reservation.checkOut)
                .toLocaleDateString('fr-FR');


    } catch (error) {

        reservationMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }
};


loadReservation();