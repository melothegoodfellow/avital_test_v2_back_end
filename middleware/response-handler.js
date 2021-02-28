const responseHandler = function(res, { data, message, status, error }){
    res.status(status).json({
        success: error.length === 0,
        data: data,
        message: message,
        error: error
    });
}

module.exports = {
    responseHandler
}