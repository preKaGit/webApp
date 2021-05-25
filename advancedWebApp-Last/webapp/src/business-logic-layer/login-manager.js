
const { BusinessError, BusinessErrorType } = require('./business-error')

module.exports = function ({ }) {
    return {

        isLoggedIn: function (isLoggedIn, callback) {
            if (!isLoggedIn)
                callback(new BusinessError(BusinessErrorType.NOT_ALLOWED, ("Unauthorized")), false)
            else {
                callback(null, true)
            }
        },
    }
}