const { login } = require("../controllers/auth");
const { responseHandler } = require("../middleware/response-handler");

const authRoutes = require("express").Router();

authRoutes.post("/login", async function(req, res){
    const result = await login(req.body.username, req.body.password);
    responseHandler(res, {
        data: result.data,
        message: result.message,
        status: result.status,
        error: result.error
    });
})

module.exports = {
    authRoutes
}