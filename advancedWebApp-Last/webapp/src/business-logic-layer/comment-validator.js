const { BusinessError, BusinessErrorType } = require('./business-error')

module.exports = function ({ }) {
    return {

        validateComment: function (comment, callback) {
            if (!comment) {
                callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("comment cannot be empty")))
            }
            else {
                callback(null)
            }

        }
    }
}