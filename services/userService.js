const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
    });

    return await user.save();
};
const loginUser = async (email, password) => {

    const user = await User.findOne({ email: email });

    if (!user) {
        return null;
    }

    const passwordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordValid) {
        return null;
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    return {
        user,
        token
    };
};
const getAllUsers = async () => {
    return await User.find().select('-password');
};
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
const updateUser = async (id, userData) => {

    const dataToUpdate = {
        name: userData.name,
        email: userData.email
    };

    // Si un nouveau mot de passe est fourni,
    // on le chiffre avant de l'enregistrer.
    if (userData.password) {
        dataToUpdate.password =
            await bcrypt.hash(userData.password, 10);
    }

    return await User.findByIdAndUpdate(
        id,
        dataToUpdate,
        {
            new: true,
            runValidators: true
        }
    ).select('-password');
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    updateUser,
    deleteUser
};