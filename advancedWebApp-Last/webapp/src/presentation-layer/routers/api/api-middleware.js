
module.exports = function({ tokenValidator }) {
    return {
        validateAccessToken: (request, response, next) => {
            const authorizationHeader = request.get("Authorization")
            const accessTokenString = authorizationHeader.substr("Bearer ".length)
            tokenValidator.validateAccessToken(accessTokenString, function(error, verifiedAccessToken) {
                if (verifiedAccessToken) {
                    request.payload = verifiedAccessToken
                    next()
                } else {
                    next(error)
                }
            })

        },



    }
}