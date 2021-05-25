const express = require("express")
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const cookieParser = require('cookie-parser')

module.exports = function ({ postManager, postValidator, loginManager, commentManager }) {

    const router = express.Router()
    router.use(cookieParser())
    router.use(csrfProtection)

    /*
        Fixa notifikationer och så att de har rätt HTML element.
        Fixa error meddelanden.
        Ta bort edit/delete det behövs inte och blir skönare.

    */
    router.get("/", function (request, response) {
        postManager.getAllPosts(function (error, posts) {
            if (error) {
                response.render("posts.hbs", { notification: error.description, notificationType: "danger" })
            }
            else {
                response.render("posts.hbs", { posts: posts })
            }
        })
    })

    router.get("/new", function (request, response) {
        loginManager.isLoggedIn(request.session.login, function (error, IsLoggedIn) {
            if (IsLoggedIn) {
                response.render("new-post.hbs", { csrfToken: request.csrfToken() })
            } else {
                const loginError = encodeURIComponent(error.description)
                response.redirect("/accounts/sign-in/?loginError=" + loginError)
            }
        })


    })

    router.post("/new", function (request, response) {

        const title = request.body.title
        const body = request.body.body
        const account = request.session.account

        loginManager.isLoggedIn(request.session.login, function (error, IsLoggedIn) {
            if (IsLoggedIn) {
                postManager.createPost(account.id, title, body, function (error, createdPostId) {
                    if (error) {
                        response.render("new-post.hbs", {
                            title: title,
                            body: body,
                            notification: error.description,
                            notificationType: "danger",
                            csrfToken: request.csrfToken()
                        })
                    } else {
                        response.redirect("/posts/" + createdPostId)
                    }
                })
            } else {
                const loginError = encodeURIComponent(error.description)
                response.redirect("/sign-in/?loginError=" + loginError)

            }
        })

    })

    router.get("/:id", function (request, response) {
        const commentError = request.query.commentError
        const postId = request.params.id
        postManager.getPost(postId, function (error, post) {
            if (error) {
                response.render("posts.hbs", { notification: error.description, notificationType: "danger" })
            } else {
                commentManager.getCommentsWithPostId(postId, function (error, comments) {
                    if (error || commentError) {
                        response.render("post.hbs", { post: post, notification: error.description, notification: commentError, notificationType: "danger" })
                    } else {
                        response.render("post.hbs", { post: post, comments: comments, csrfToken: request.csrfToken() })
                    }
                })
            }
        })
    })


    router.post("/:id", function (request, response) {
        const postId = request.params.id
        const comment = request.body.comment
        const account = request.session.account
        /*
        Checka hur error skickas 
        */
        loginManager.isLoggedIn(request.session.login, function (error, IsLoggedIn) {
            if (IsLoggedIn) {
                commentManager.createCommentOnPostId(account.id, postId, comment, function (error) {
                    if (error) {
                        const commentError = encodeURIComponent(error.description)
                        response.redirect("/posts/" + postId + "/?commentError=" + commentError)
                    } else {
                        response.redirect("/posts/" + postId)
                    }
                })
            } else {
                const loginError = encodeURIComponent(error.description)
                response.redirect("/sign-in/?loginError=" + loginError)
            }
        })
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