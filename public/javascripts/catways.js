const catwaysList = document.getElementById('catways-list');
const catwaysMessage = document.getElementById('catways-message');


const loadCatways = async () => {

    try {

        const response = await fetch('/catways');


        // L'utilisateur n'est pas connecté
        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        if (!response.ok) {
            catwaysMessage.textContent =
                'Impossible de récupérer les catways';

            return;
        }


        const catways = await response.json();


        catways.forEach(function (catway) {

            const row = document.createElement('tr');


            const numberCell = document.createElement('td');
            numberCell.textContent = catway.catwayNumber;


            const typeCell = document.createElement('td');
            typeCell.textContent = catway.type;


            const stateCell = document.createElement('td');
            stateCell.textContent = catway.catwayState;


            const detailCell = document.createElement('td');

            const detailLink = document.createElement('a');

            detailLink.href =
                `/catway.html?id=${catway.catwayNumber}`;

            detailLink.textContent = 'Voir';


            detailCell.appendChild(detailLink);

            row.appendChild(numberCell);
            row.appendChild(typeCell);
            row.appendChild(stateCell);
            row.appendChild(detailCell);

            catwaysList.appendChild(row);
        });


    } catch (error) {

        catwaysMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }
};


loadCatways();