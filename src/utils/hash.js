// Utility function to hash a string

const bcrypt = require("bcrypt")
const saltRounds = 8

const hash = async (input) => {
    return await bcrypt.hash(input, saltRounds);
}

module.exports = hash;