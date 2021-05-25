/*
       Model class: Utilizes the BusinessErrorType value to convert it to an error code
       
*/
const { BusinessErrorType } = require("../business-logic-layer/business-error")

class PresentationError {
    constructor(businessError) {
        this.errorType = businessError.errorType
        this.description = businessError.description
        switch (this.errorType) {
            case BusinessErrorType.NOT_FOUND:
                {
                    this.statusCode = 404
                    break
                }
            case BusinessErrorType.DATA_LAYER_ERROR:
                {
                    this.statusCode = 500
                    break
                }
            case BusinessErrorType.NOT_ALLOWED:
                {
                    this.statusCode = 401
                    break
                }
            case BusinessErrorType.INVALID_DATA:
                {
                    this.statusCode = 400
                    break
                }
            default:
                {
                    this.statusCode = 500
                }
        }
    }
}

exports.PresentationError = PresentationError