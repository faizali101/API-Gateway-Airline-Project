function successResponse(data, message) {
    return {
        success: true,
        message: message || 'Successfully created the request!',
        data: data || {},
        error: {}
    };
}

module.exports = successResponse;