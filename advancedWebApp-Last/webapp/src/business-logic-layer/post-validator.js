
const { BusinessError, BusinessErrorType } = require('./business-error')

module.exports = function ({ }) {
    return {

        validatePost: function (title, body, callback) {
            if (!body && !title) {
                callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("title and body cannot be empty")))
            }
            else if (!body) {
                callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("body cannot be empty")))
            }
            else if (!title) {
                callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("title cannot be empty")))
            }
            else {
                callback(null)
            }

        },


        /*
            Checks if a user is the owner/creator of a post  
        */


        isOwner: function (accountId, postAccountid, callback) {
            if (accountId == null) {
                callback(new BusinessError(BusinessErrorType.NOT_ALLOWED, ("Unathorized")), false)
            } else if (accountId == postAccountid) {
                callback(null, true)
            } else {
                callback(new BusinessError(BusinessErrorType.NOT_ALLOWED, ("Unathorized")), false)
            }
        },

    }
}