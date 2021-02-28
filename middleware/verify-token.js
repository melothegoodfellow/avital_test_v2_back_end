const { decodeToken } = require("../library/token-generation");
const { responseHandler } = require("./response-handler");

module.exports = function(req, res, next){
    if(!req.headers.authorization) {
        return responseHandler(res, {
            data: [],
            message: "unautorized",
            status: 401,
            error: []
        });
    }
    else{
        const tokenData = decodeToken(req.headers.authorization.split(' ')[1]);
        req.userId = tokenData.userId;
        next();
    }
}