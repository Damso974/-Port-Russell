const catwayService = require('../services/catwayService');

const getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();

        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway non trouvé'
            });
        }

        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createCatway = async (req, res) => {
    try {
        const catway = await catwayService.createCatway(req.body);

        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const updateCatway = async (req, res) => {
    try {
        const catway = await catwayService.updateCatway(
            req.params.id,
            req.body
        );

        if (!catway) {
            return res.status(404).json({
                message: 'Catway non trouvé'
            });
        }

        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const patchCatway = async (req, res) => {
    try {
        const catway = await catwayService.patchCatway(
            req.params.id,
            req.body
        );

        if (!catway) {
            return res.status(404).json({
                message: 'Catway non trouvé'
            });
        }

        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteCatway = async (req, res) => {
    try {
        const catway = await catwayService.deleteCatway(req.params.id);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway non trouvé'
            });
        }

        res.status(200).json({
            message: 'Catway supprimé avec succès'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllCatways,
    getCatwayById,
    createCatway,
    updateCatway,
    patchCatway,
    deleteCatway
};