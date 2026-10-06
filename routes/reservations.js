const express = require('express');
const router = express.Router();

const reservationController =
    require('../controllers/reservationController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get('/', authMiddleware,reservationController.getAllReservations
);

module.exports = router;