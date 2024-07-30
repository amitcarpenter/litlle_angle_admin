// responseHandler.js
function handleResponse(res, statusCode, success, message, data = null) {
    res.status(statusCode).json({
        success,
        status: statusCode,
        message,
        data
    });
}

module.exports = handleResponse;
