const Catway = require('../models/Catway');

const getAllCatways = async () => {
    return await Catway.find();
};
const getCatwayById = async (id) => {
    return await Catway.findOne({ catwayNumber: id });
};
const createCatway = async (catwayData) => {
    const catway = new Catway(catwayData);
    return await catway.save();
};
const updateCatway = async (id, catwayData) => {
    return await Catway.findOneAndReplace(
        { catwayNumber: id },
        catwayData,
        {
            new: true,
            runValidators: true
        }
    );
};
const patchCatway = async (id, catwayData) => {
    return await Catway.findOneAndUpdate(
        { catwayNumber: id },
        { $set: catwayData },
        {
            new: true,
            runValidators: true
        }
    );
};
const deleteCatway = async (id) => {
    return await Catway.findOneAndDelete({
        catwayNumber: id
    });
};

module.exports = {
    getAllCatways,
    getCatwayById,
    createCatway,
    updateCatway,
    patchCatway,
    deleteCatway
};