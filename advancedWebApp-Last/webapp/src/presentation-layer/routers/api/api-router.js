const express = require('express')
const { PresentationError } = require('../../presentation-error')
module.exports = function({ accountValidator, tokenManager }) {
    const router = express.Router()

    router.post("/tokens", function(request, response, next) {

        const grant_type = request.body.grant_type
        const username = request.body.username
        const password = request.body.password
        if (grant_type != "password") {
            response.status(400).json({
                error: "unsupported_grant_type"
            })

        } else {
            accountValidator.checkCredentials(username, password, function(error, account) {
                if (error) {
                    console.log("Hej", error)
                    next(error)
                } else {
                    tokenManager.generateIDandAccessToken(account, function(accessToken, idToken) {
                        response.status(200).json({ access_token: accessToken, id_token: idToken })
                    })
                }
            })
        }

    })

    /*
         Listens if any presentationErrors occurr 
         if an error is detected it the status and error texts gets sent back
     */

    router.use((error, request, response, next) => {
        var presentationError = new PresentationError(error)
        response.status(presentationError.statusCode).json(presentationError)
    })

    return router
}