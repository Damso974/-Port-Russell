const reservationService = require('../services/reservationService');
const getAllReservations = async (req, res) => {
    try {
        const reservations =
            await reservationService.getAllReservations();

        res.status(200).json(reservations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getReservationsByCatway = async (req, res) => {
    try {
        const reservations =
            await reservationService.getReservationsByCatway(req.params.id);

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(
            req.params.id,
            req.params.idReservation
        );

        if (!reservation) {
            return res.status(404).json({
                message: 'Réservation non trouvée'
            });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const createReservation = async (req, res) => {
    try {
        const reservationData = {
            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        };

        const reservation =
            await reservationService.createReservation(reservationData);

        res.status(201).json(reservation);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteReservation = async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(
            req.params.id,
            req.params.idReservation
        );

        if (!reservation) {
            return res.status(404).json({
                message: 'Réservation non trouvée'
            });
        }

        res.status(200).json({
            message: 'Réservation supprimée avec succès'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getReservationsByCatway,
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation
};