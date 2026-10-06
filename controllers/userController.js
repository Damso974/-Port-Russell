const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        console.log('USER DATA :', userData);

        const user = await userService.createUser(userData);

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const loginUser = async (req, res) => {
    try {

        const result = await userService.loginUser(
            req.body.email,
            req.body.password
        );

        if (!result) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        res.cookie('token', result.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
});

res.status(200).json({
    message: 'Connexion réussie'
});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé'
            });
        }

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const logoutUser = (req, res) => {
    res.clearCookie('token');

    res.status(200).json({
        message: 'Déconnexion réussie'
    });
};
const updateUser = async (req, res) => {

    try {

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const user = await userService.updateUser(
            req.params.id,
            userData
        );


        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }


        res.status(200).json({
            message: 'Utilisateur modifié avec succès',
            user: user
        });


    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }

};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    updateUser,
    deleteUser,
    logoutUser

};