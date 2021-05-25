const JWT_SECRET = "5kRh21AucYhm3but2s67jEIWSy1mJekN"
const jwt = require("jsonwebtoken")
const { BusinessError, BusinessErrorType } = require('./business-error')

module.exports = function({}) {
    return {

        validateAccessToken: function(accessToken, callback) {
            jwt.verify(accessToken, JWT_SECRET, (error, verifiedAccessToken) => {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.NOT_ALLOWED, "Invalid_token"), null)
                } else {
                    callback(null, verifiedAccessToken)
                }
            })
        }

    }

}