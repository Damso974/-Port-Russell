const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', async function (event) {

    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {

        const response = await fetch('/users/login', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent = data.message;
            return;
        }

        loginMessage.textContent = 'Connexion réussie';

window.location.href = '/dashboard.html';
    } catch (error) {

        loginMessage.textContent =
            'Erreur lors de la connexion au serveur';

        console.error(error);
    }

});