function errorResponse(error, message) {
    return {
        success: false,
        message: message || 'Something went wrong!',
        data: {},
        error: error || {}
    };
}

module.exports = errorResponse;