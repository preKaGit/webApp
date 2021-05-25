const express = require('express')
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const cookieParser = require('cookie-parser')


module.exports = function ({ accountManager, accountValidator, loginManager }) {

    const router = express.Router()
    router.use(cookieParser())
    router.use(csrfProtection)

    router.get("/sign-up", function (request, response) {

        response.render("accounts-sign-up.hbs", { csrfToken: request.csrfToken() })
    })

    router.get("/sign-in", function (request, response) {
        const loginError = request.query.loginError
        loginManager.isLoggedIn(request.session.login, function (error, IsLoggedIn) {
            if (IsLoggedIn) {
                response.redirect("/")
            } else {
                response.render("accounts-sign-in.hbs", { csrfToken: request.csrfToken(), notification: loginError, notificationType: "danger" })
            }
        })

    })

    router.post("/sign-up", function (request, response) {
        const username = request.body.username
        const password = request.body.password
        accountManager.createAccount(username, password, function (error, account) {
            if (error) {
                response.render("accounts-sign-up.hbs", {
                    username: username, notification: error.description, notificationType: "danger",
                    csrfToken: request.csrfToken()
                })
            } else {
                request.session.account = account
                request.session.login = true
                response.redirect("/")
            }

        })

    })

    router.post("/sign-in", function (request, response) {
        const username = request.body.username
        const password = request.body.password
        accountValidator.checkCredentials(username, password, function (error, account) {
            if (error) {
                response.render("accounts-sign-in.hbs", {
                    username: username, notification: error.description, notificationType: "danger",
                    csrfToken: request.csrfToken()
                })
            } else {
                request.session.account = account
                request.session.login = true
                response.redirect("/")

            }
        })
    })

    router.get("/sign-out", function (request, response) {
        if (request.session && request.session.login) {
            request.session.destroy()
            response.render("sign-out.hbs")
        } else {
            response.redirect("/")
        }
    })

    router.use(function (error, request, response, next) {
        if (error.code !== 'EBADCSRFTOKEN') {
            return next(error)
        }
        response.status(403)
        response.send('Form has been tamepered with')
    })

    return router
}