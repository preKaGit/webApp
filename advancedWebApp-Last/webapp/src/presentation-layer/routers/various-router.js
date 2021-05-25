const express = require('express')


module.exports = function ({ }) {
    const router = express.Router()

    router.use(express.urlencoded({ extended: false }))

    router.get("/", function (request, response) {
        response.render("home.hbs")
    })
    return router
}