const reservationsList =
    document.getElementById('reservations-list');

const reservationsMessage =
    document.getElementById('reservations-message');


const loadReservations = async () => {

    try {

        const response = await fetch('/reservations');


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        if (!response.ok) {
            reservationsMessage.textContent =
                'Impossible de récupérer les réservations';

            return;
        }


        const reservations = await response.json();


        reservations.forEach(function (reservation) {

            const row = document.createElement('tr');


            // Catway
            const catwayCell = document.createElement('td');

            catwayCell.textContent =
                reservation.catwayNumber;


            // Client
            const clientCell = document.createElement('td');

            clientCell.textContent =
                reservation.clientName;


            // Bateau
            const boatCell = document.createElement('td');

            boatCell.textContent =
                reservation.boatName;


            // Date d'arrivée
            const checkInCell = document.createElement('td');

            checkInCell.textContent =
                new Date(reservation.checkIn)
                    .toLocaleDateString('fr-FR');


            // Date de départ
            const checkOutCell = document.createElement('td');

            checkOutCell.textContent =
                new Date(reservation.checkOut)
                    .toLocaleDateString('fr-FR');


            // Lien vers le détail
            const detailCell = document.createElement('td');

            const detailLink = document.createElement('a');

            detailLink.href =
                `/reservation.html?catway=${reservation.catwayNumber}&id=${reservation._id}`;

            detailLink.textContent = 'Voir';

            detailCell.appendChild(detailLink);


            // Bouton de suppression
            const deleteCell = document.createElement('td');

            const deleteButton =
                document.createElement('button');

            deleteButton.textContent = 'Supprimer';


            deleteButton.addEventListener(
                'click',
                async function () {

                    const confirmation =
                        window.confirm(
                            `Voulez-vous vraiment supprimer la réservation de ${reservation.clientName} ?`
                        );


                    if (!confirmation) {
                        return;
                    }


                    try {

                        const deleteResponse = await fetch(
                            `/catways/${reservation.catwayNumber}/reservations/${reservation._id}`,
                            {
                                method: 'DELETE'
                            }
                        );


                        if (deleteResponse.status === 401) {
                            window.location.href = '/';
                            return;
                        }


                        if (!deleteResponse.ok) {

                            reservationsMessage.textContent =
                                'Impossible de supprimer la réservation';

                            return;
                        }


                        // Retire la ligne du tableau
                        row.remove();


                        reservationsMessage.textContent =
                            'Réservation supprimée avec succès';


                    } catch (error) {

                        reservationsMessage.textContent =
                            'Erreur lors de la communication avec le serveur';

                        console.error(error);
                    }
                }
            );


            deleteCell.appendChild(deleteButton);


            // Ajout des cellules dans la ligne
            row.appendChild(catwayCell);
            row.appendChild(clientCell);
            row.appendChild(boatCell);
            row.appendChild(checkInCell);
            row.appendChild(checkOutCell);
            row.appendChild(detailCell);
            row.appendChild(deleteCell);


            // Ajout de la ligne dans le tableau
            reservationsList.appendChild(row);
        });


    } catch (error) {

        reservationsMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }
};


loadReservations();