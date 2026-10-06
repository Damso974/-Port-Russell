const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me',authMiddleware,(req, res) => {
res.status(200).json({ authenticated: true,  user: req.user })});
router.get('/', authMiddleware, userController.getAllUsers);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.post('/logout',authMiddleware,userController.logoutUser);
router.patch('/:id',authMiddleware,userController.updateUser);
module.exports = router;