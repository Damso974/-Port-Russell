
const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');


// ========================================
// Liste de toutes les réservations
// ========================================

const getAllReservations = async () => {

    return await Reservation.find();
};


// ========================================
// Réservations d'un catway
// ========================================

const getReservationsByCatway = async (catwayNumber) => {

    return await Reservation.find({
        catwayNumber: catwayNumber
    });
};


// ========================================
// Détail d'une réservation
// ========================================

const getReservationById = async (
    catwayNumber,
    reservationId
) => {

    return await Reservation.findOne({
        _id: reservationId,
        catwayNumber: catwayNumber
    });
};


// ========================================
// Création d'une réservation
// ========================================

const createReservation = async (reservationData) => {

    // Vérification de l'existence du catway
    const catway = await Catway.findOne({
        catwayNumber: reservationData.catwayNumber
    });


    if (!catway) {
        throw new Error('Catway introuvable');
    }


    // Conversion des dates
    const checkIn =
        new Date(reservationData.checkIn);

    const checkOut =
        new Date(reservationData.checkOut);


    // Vérification de la validité des dates
    if (
        Number.isNaN(checkIn.getTime()) ||
        Number.isNaN(checkOut.getTime())
    ) {
        throw new Error('Dates invalides');
    }


    if (checkOut <= checkIn) {
        throw new Error(
            'La date de départ doit être postérieure à la date d’arrivée'
        );
    }


    // Recherche d'une réservation qui chevauche
    // la période demandée
    const existingReservation =
        await Reservation.findOne({

            catwayNumber: reservationData.catwayNumber,

            checkIn: {
                $lt: checkOut
            },

            checkOut: {
                $gt: checkIn
            }
        });


    if (existingReservation) {
        throw new Error(
            'Le catway est déjà réservé sur cette période'
        );
    }


    // Création de la réservation
    const reservation =
        new Reservation({
            ...reservationData,
            checkIn: checkIn,
            checkOut: checkOut
        });


    return await reservation.save();
};


// ========================================
// Suppression d'une réservation
// ========================================

const deleteReservation = async (
    catwayNumber,
    reservationId
) => {

    return await Reservation.findOneAndDelete({
        _id: reservationId,
        catwayNumber: catwayNumber
    });
};


// ========================================
// Export
// ========================================

module.exports = {
    getReservationsByCatway,
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation
};
