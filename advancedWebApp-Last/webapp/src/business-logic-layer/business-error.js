/*
    Model class for creating errors
    ErrorType specifies where/what/how the error is
    Description is a custom message displayed to the user
*/

const BusinessErrorType = {
    NOT_FOUND: "NOT_FOUND",
    NOT_ALLOWED: "NOT_ALLOWED",
    ALREADY_EXISTS: "ALREADY_EXISTS",
    INVALID_DATA: "INVALID_DATA",
    INVALID_TOKEN: "INVALID_TOKEN",
    DATA_LAYER_ERROR: "DATA_LAYER_ERROR",
}

class BusinessError {
    constructor(errorType, description) {
        this.errorType = errorType
        this.description = description
    }
}

exports.BusinessErrorType = BusinessErrorType
exports.BusinessError = BusinessError