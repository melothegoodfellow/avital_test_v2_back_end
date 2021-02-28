const jwt = require("jsonwebtoken");

const secretKey = "avital_test_v2";

const getToken = function(userId){
    return jwt.sign({ userId: userId }, secretKey);
}

const decodeToken = function(token){
    return jwt.decode(token);
}

module.exports = {
    getToken,
    decodeToken
}