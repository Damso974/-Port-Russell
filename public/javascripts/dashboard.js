
// ========================================
// Vérification de l'authentification
// ========================================

const checkAuthentication = async () => {

    try {

        const response = await fetch('/users/me');


        if (!response.ok) {
            window.location.href = '/';
            return;
        }


    } catch (error) {

        console.error(
            'Erreur lors de la vérification de l’authentification',
            error
        );

        window.location.href = '/';
    }
};


checkAuthentication();


// ========================================
// Déconnexion
// ========================================

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async function () {

    try {

        const response = await fetch('/users/logout', {
            method: 'POST'
        });

        if (response.ok) {
            window.location.href = '/';
            return;
        }

        console.error('Erreur lors de la déconnexion');

    } catch (error) {
        console.error(error);
    }

});


// ========================================
// Création d'un catway
// ========================================

const createCatwayForm =
    document.getElementById('create-catway-form');

const createCatwayMessage =
    document.getElementById('create-catway-message');


createCatwayForm.addEventListener('submit', async function (event) {

    event.preventDefault();


    const catwayNumber =
        document.getElementById('catway-number').value;

    const type =
        document.getElementById('catway-type').value;

    const catwayState =
        document.getElementById('catway-state').value;


    try {

        const response = await fetch('/catways', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                catwayNumber: Number(catwayNumber),
                type: type,
                catwayState: catwayState
            })
        });


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        const data = await response.json();


        if (!response.ok) {

            createCatwayMessage.textContent =
                data.message || 'Impossible de créer le catway';

            return;
        }


        createCatwayMessage.textContent =
            `Catway ${data.catwayNumber} créé avec succès`;

        createCatwayForm.reset();


    } catch (error) {

        createCatwayMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }

});


// ========================================
// Modification d'un catway
// ========================================

const updateCatwayForm =
    document.getElementById('update-catway-form');

const updateCatwayMessage =
    document.getElementById('update-catway-message');


updateCatwayForm.addEventListener('submit', async function (event) {

    event.preventDefault();


    const catwayNumber =
        document.getElementById('update-catway-number').value;

    const catwayState =
        document.getElementById('update-catway-state').value;


    try {

        const response = await fetch(
            `/catways/${catwayNumber}`,
            {
                method: 'PATCH',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    catwayState: catwayState
                })
            }
        );


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        const data = await response.json();


        if (response.status === 404) {

            updateCatwayMessage.textContent =
                'Catway introuvable';

            return;
        }


        if (!response.ok) {

            updateCatwayMessage.textContent =
                data.message || 'Impossible de modifier le catway';

            return;
        }


        updateCatwayMessage.textContent =
            `Catway ${data.catwayNumber} modifié avec succès`;

        updateCatwayForm.reset();


    } catch (error) {

        updateCatwayMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }

});


// ========================================
// Suppression d'un catway
// ========================================

const deleteCatwayForm =
    document.getElementById('delete-catway-form');

const deleteCatwayMessage =
    document.getElementById('delete-catway-message');


deleteCatwayForm.addEventListener('submit', async function (event) {

    event.preventDefault();


    const catwayNumber =
        document.getElementById('delete-catway-number').value;


    const confirmation = window.confirm(
        `Voulez-vous vraiment supprimer le catway ${catwayNumber} ?`
    );


    if (!confirmation) {
        return;
    }


    try {

        const response = await fetch(
            `/catways/${catwayNumber}`,
            {
                method: 'DELETE'
            }
        );


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        const data = await response.json();


        if (response.status === 404) {

            deleteCatwayMessage.textContent =
                'Catway introuvable';

            return;
        }


        if (!response.ok) {

            deleteCatwayMessage.textContent =
                data.message || 'Impossible de supprimer le catway';

            return;
        }


        deleteCatwayMessage.textContent =
            `Catway ${catwayNumber} supprimé avec succès`;

        deleteCatwayForm.reset();


    } catch (error) {

        deleteCatwayMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }

});


// ========================================
// Création d'une réservation
// ========================================

const createReservationForm =
    document.getElementById('create-reservation-form');

const createReservationMessage =
    document.getElementById('create-reservation-message');


createReservationForm.addEventListener('submit', async function (event) {

    event.preventDefault();


    const catwayNumber =
        document.getElementById('reservation-catway').value;

    const clientName =
        document.getElementById('reservation-client').value;

    const boatName =
        document.getElementById('reservation-boat').value;

    const checkIn =
        document.getElementById('reservation-checkin').value;

    const checkOut =
        document.getElementById('reservation-checkout').value;


    // Vérification simple des dates
    if (new Date(checkOut) <= new Date(checkIn)) {

        createReservationMessage.textContent =
            'La date de départ doit être postérieure à la date d’arrivée';

        return;
    }


    try {

        const response = await fetch(
            `/catways/${catwayNumber}/reservations`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    clientName: clientName,
                    boatName: boatName,
                    checkIn: checkIn,
                    checkOut: checkOut
                })
            }
        );


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        const data = await response.json();


        if (!response.ok) {

            createReservationMessage.textContent =
                data.message || 'Impossible de créer la réservation';

            return;
        }


        createReservationMessage.textContent =
            `Réservation créée pour ${data.clientName}`;

        createReservationForm.reset();


    } catch (error) {

        createReservationMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }

});


// ========================================
// Création d'un utilisateur
// ========================================

const createUserForm =
    document.getElementById('create-user-form');

const createUserMessage =
    document.getElementById('create-user-message');


createUserForm.addEventListener('submit', async function (event) {

    event.preventDefault();


    const name =
        document.getElementById('user-name').value;

    const email =
        document.getElementById('user-email').value;

    const password =
        document.getElementById('user-password').value;


    try {

        const response = await fetch('/users', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });


        const data = await response.json();


        if (!response.ok) {

            createUserMessage.textContent =
                data.message || 'Impossible de créer l’utilisateur';

            return;
        }


        createUserMessage.textContent =
            `Utilisateur ${data.name} créé avec succès`;

        createUserForm.reset();


    } catch (error) {

        createUserMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }

});
