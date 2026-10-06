const express = require('express');
const router = express.Router();

const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware, catwayController.getAllCatways);
router.get('/:id/reservations',authMiddleware, reservationController.getReservationsByCatway);
router.get('/:id/reservations/:idReservation', authMiddleware,reservationController.getReservationById);
router.get('/:id',authMiddleware, catwayController.getCatwayById);
router.post('/',authMiddleware,catwayController.createCatway);
router.put('/:id',authMiddleware, catwayController.updateCatway);
router.patch('/:id',authMiddleware, catwayController.patchCatway);
router.delete('/:id',authMiddleware, catwayController.deleteCatway);

router.post('/:id/reservations',authMiddleware,reservationController.createReservation);
router.delete('/:id/reservations/:idReservation',authMiddleware,reservationController.deleteReservation);


module.exports = router;