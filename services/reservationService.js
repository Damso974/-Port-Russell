const Reservation = require('../models/Reservation');

const getAllReservations = async () => {
    return await Reservation.find();
};

const getReservationsByCatway = async (catwayNumber) => {
    return await Reservation.find({
        catwayNumber: catwayNumber
    });
};
const getReservationById = async (catwayNumber, reservationId) => {
    return await Reservation.findOne({
        _id: reservationId,
        catwayNumber: catwayNumber
    });
};
const createReservation = async (reservationData) => {
    const reservation = new Reservation(reservationData);
    return await reservation.save();
};
const deleteReservation = async (catwayNumber, reservationId) => {
    return await Reservation.findOneAndDelete({
        _id: reservationId,
        catwayNumber: catwayNumber
    });
};

module.exports = {
    getReservationsByCatway,
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation
};