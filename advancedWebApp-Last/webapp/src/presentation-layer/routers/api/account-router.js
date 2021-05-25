const express = require('express')
const { PresentationError } = require('../../presentation-error')

module.exports = function ({ accountManager }) {
    const router = express.Router()


    router.post("/", function (request, response, next) {

        const username = request.body.username
        const password = request.body.password
        accountManager.createAccount(username, password, function (error, account) {
            if (error) {
                console.log(error)
                next(error)
            } else {
                response.sendStatus(204)
            }
        })

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