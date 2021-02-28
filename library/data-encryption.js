const bcrypt = require("bcrypt");
const saltRounds = 10;

const passwordHash = function(passwordText){
    return bcrypt.hashSync(passwordText, saltRounds);
}

const passwordCompare = function(passwordText, passwordHash){
    return bcrypt.compareSync(passwordText, passwordHash);
}

module.exports = {
    passwordHash,
    passwordCompare
}