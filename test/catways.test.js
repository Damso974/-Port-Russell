const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');

const app = require('../app');
const agent = request.agent(app);

// ID de la réservation créée pendant les tests
let reservationId;


describe('Catways et réservations', function () {

    // Nettoyage de la base de données de test
    before(async function () {
        await mongoose.connection.dropDatabase();
    });


    // Création et connexion de l'utilisateur utilisé pour les tests
    before(async function () {

        await agent
            .post('/users')
            .send({
                name: 'Test Mocha',
                email: 'mocha@test.fr',
                password: 'Test@1234'
            });

        const response = await agent
            .post('/users/login')
            .send({
                email: 'mocha@test.fr',
                password: 'Test@1234'
            });

        assert.strictEqual(response.status, 200);
    });


    // =====================================================
    // TESTS CATWAYS
    // =====================================================


    // Test de la protection de la route
    it('GET /catways sans authentification doit retourner 401', async function () {

        const response = await request(app)
            .get('/catways');

        assert.strictEqual(response.status, 401);

        assert.strictEqual(
            response.body.message,
            'Authentification requise'
        );
    });


    // Liste des catways
    it('GET /catways avec authentification doit retourner 200', async function () {

        const response = await agent
            .get('/catways');

        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body));
    });


    // Création d'un catway
    it('POST /catways doit créer un nouveau catway', async function () {

        const response = await agent
            .post('/catways')
            .send({
                catwayNumber: 1,
                type: 'short',
                catwayState: 'Bon état'
            });

        assert.strictEqual(response.status, 201);

        assert.strictEqual(
            response.body.catwayNumber,
            1
        );

        assert.strictEqual(
            response.body.type,
            'short'
        );

        assert.strictEqual(
            response.body.catwayState,
            'Bon état'
        );
    });


    // Consultation d'un catway
    it('GET /catways/:id doit retourner le catway demandé', async function () {

        const response = await agent
            .get('/catways/1');

        assert.strictEqual(response.status, 200);

        assert.strictEqual(
            response.body.catwayNumber,
            1
        );

        assert.strictEqual(
            response.body.type,
            'short'
        );

        assert.strictEqual(
            response.body.catwayState,
            'Bon état'
        );
    });


    // Modification complète d'un catway
    it('PUT /catways/:id doit modifier complètement le catway', async function () {

        const response = await agent
            .put('/catways/1')
            .send({
                catwayNumber: 1,
                type: 'long',
                catwayState: 'En maintenance'
            });

        assert.strictEqual(response.status, 200);

        assert.strictEqual(
            response.body.catwayNumber,
            1
        );

        assert.strictEqual(
            response.body.type,
            'long'
        );

        assert.strictEqual(
            response.body.catwayState,
            'En maintenance'
        );
    });


    // Modification partielle d'un catway
    it('PATCH /catways/:id doit modifier uniquement le champ envoyé', async function () {

        const response = await agent
            .patch('/catways/1')
            .send({
                catwayState: 'Bon état'
            });

        assert.strictEqual(response.status, 200);

        assert.strictEqual(
            response.body.catwayState,
            'Bon état'
        );

        // Vérifie que PATCH n'a pas modifié le type
        assert.strictEqual(
            response.body.type,
            'long'
        );
    });


    // =====================================================
    // TESTS RÉSERVATIONS
    // =====================================================


    // Création d'une réservation
    it('POST /catways/:id/reservations doit créer une réservation', async function () {

        const response = await agent
            .post('/catways/1/reservations')
            .send({
                clientName: 'Jean Dupont',
                boatName: 'Océan',
                checkIn: '2026-10-10',
                checkOut: '2026-10-15'
            });

        assert.strictEqual(response.status, 201);

        assert.strictEqual(
            response.body.catwayNumber,
            1
        );

        assert.strictEqual(
            response.body.clientName,
            'Jean Dupont'
        );

        assert.strictEqual(
            response.body.boatName,
            'Océan'
        );

        // On conserve l'ID MongoDB pour les tests suivants
        reservationId = response.body._id;

        assert.ok(reservationId);
    });


    // Liste des réservations d'un catway
    it('GET /catways/:id/reservations doit retourner les réservations du catway', async function () {

        const response = await agent
            .get('/catways/1/reservations');

        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body));

        assert.strictEqual(
            response.body.length,
            1
        );
    });


    // Consultation d'une réservation
    it('GET /catways/:id/reservations/:idReservation doit retourner la réservation', async function () {

        const response = await agent
            .get(`/catways/1/reservations/${reservationId}`);

        assert.strictEqual(response.status, 200);

        assert.strictEqual(
            response.body.clientName,
            'Jean Dupont'
        );

        assert.strictEqual(
            response.body.boatName,
            'Océan'
        );

        assert.strictEqual(
            response.body.catwayNumber,
            1
        );
    });


    // Suppression d'une réservation
    it('DELETE /catways/:id/reservations/:idReservation doit supprimer la réservation', async function () {

        const response = await agent
            .delete(`/catways/1/reservations/${reservationId}`);

        assert.strictEqual(response.status, 200);

        // Vérifie que la réservation n'existe réellement plus
        const verification = await agent
            .get(`/catways/1/reservations/${reservationId}`);

        assert.strictEqual(
            verification.status,
            404
        );
    });


    // =====================================================
    // SUPPRESSION DU CATWAY
    // =====================================================


    // Ce test doit être effectué après les tests des réservations
    it('DELETE /catways/:id doit supprimer le catway', async function () {

        const response = await agent
            .delete('/catways/1');

        assert.strictEqual(response.status, 200);

        // Vérifie que le catway n'existe réellement plus
        const verification = await agent
            .get('/catways/1');

        assert.strictEqual(
            verification.status,
            404
        );
    });


    // Fermeture de la connexion MongoDB après tous les tests
    after(async function () {
        await mongoose.connection.close();
    });

});