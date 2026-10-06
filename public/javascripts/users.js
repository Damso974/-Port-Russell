
const usersList =
    document.getElementById('users-list');

const usersMessage =
    document.getElementById('users-message');


const loadUsers = async () => {

    try {

        const response = await fetch('/users');


        if (response.status === 401) {
            window.location.href = '/';
            return;
        }


        if (!response.ok) {

            usersMessage.textContent =
                'Impossible de récupérer les utilisateurs';

            return;
        }


        const users = await response.json();


        users.forEach(function (user) {

            const row =
                document.createElement('tr');


            // Nom
            const nameCell =
                document.createElement('td');

            nameCell.textContent =
                user.name;


            // Email
            const emailCell =
                document.createElement('td');

            emailCell.textContent =
                user.email;


            // Modification
            const updateCell =
                document.createElement('td');

            const updateButton =
                document.createElement('button');

            updateButton.textContent =
                'Modifier';


            updateButton.addEventListener(
                'click',
                async function () {

                    const newName = window.prompt(
                        'Nouveau nom :',
                        user.name
                    );


                    if (newName === null) {
                        return;
                    }


                    const newEmail = window.prompt(
                        'Nouvel email :',
                        user.email
                    );


                    if (newEmail === null) {
                        return;
                    }


                    try {

                        const updateResponse =
                            await fetch(
                                `/users/${user._id}`,
                                {
                                    method: 'PATCH',

                                    headers: {
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        name: newName,
                                        email: newEmail
                                    })
                                }
                            );


                        const data =
                            await updateResponse.json();


                        if (updateResponse.status === 401) {
                            window.location.href = '/';
                            return;
                        }


                        if (!updateResponse.ok) {

                            usersMessage.textContent =
                                data.message ||
                                'Impossible de modifier l’utilisateur';

                            return;
                        }


                        nameCell.textContent =
                            data.user.name;

                        emailCell.textContent =
                            data.user.email;


                        user.name =
                            data.user.name;

                        user.email =
                            data.user.email;


                        usersMessage.textContent =
                            'Utilisateur modifié avec succès';


                    } catch (error) {

                        usersMessage.textContent =
                            'Erreur lors de la communication avec le serveur';

                        console.error(error);
                    }
                }
            );


            updateCell.appendChild(updateButton);


            // Suppression
            const deleteCell =
                document.createElement('td');

            const deleteButton =
                document.createElement('button');

            deleteButton.textContent =
                'Supprimer';


            deleteButton.addEventListener(
                'click',
                async function () {

                    const confirmation =
                        window.confirm(
                            `Voulez-vous supprimer l'utilisateur ${user.name} ?`
                        );


                    if (!confirmation) {
                        return;
                    }


                    try {

                        const deleteResponse =
                            await fetch(
                                `/users/${user._id}`,
                                {
                                    method: 'DELETE'
                                }
                            );


                        if (deleteResponse.status === 401) {
                            window.location.href = '/';
                            return;
                        }


                        if (!deleteResponse.ok) {

                            usersMessage.textContent =
                                'Impossible de supprimer l’utilisateur';

                            return;
                        }


                        row.remove();

                        usersMessage.textContent =
                            'Utilisateur supprimé avec succès';


                    } catch (error) {

                        usersMessage.textContent =
                            'Erreur lors de la communication avec le serveur';

                        console.error(error);
                    }
                }
            );


            deleteCell.appendChild(deleteButton);


            // Ajout des cellules dans la ligne
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(updateCell);
            row.appendChild(deleteCell);


            usersList.appendChild(row);
        });


    } catch (error) {

        usersMessage.textContent =
            'Erreur lors de la communication avec le serveur';

        console.error(error);
    }
};


loadUsers();
