const capitalizeFirstLetter = require("./capitalizeFirstLetter");

const getRoutes = (model) => {
    return require(`../models/${capitalizeFirstLetter(model)}/${model}.routes`);
}

module.exports = getRoutes;
