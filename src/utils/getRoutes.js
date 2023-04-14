// Utility function to get the routes for a given model

const capitalizeFirstLetter = require("./capitalizeFirstLetter");

const getRoutes = (model) => {
    return require(`../models/${capitalizeFirstLetter(model)}/${model}.routes`);
}

module.exports = getRoutes;
