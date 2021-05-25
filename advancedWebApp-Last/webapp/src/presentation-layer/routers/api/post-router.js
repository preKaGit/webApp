const express = require('express')
const { PresentationError } = require('../../presentation-error')


module.exports = function ({ postManager, apiMiddleware }) {
    const router = express.Router()

    /*
        Se till allt fungerar så som det ska.
    */
    router.post("/create-post", apiMiddleware.validateAccessToken, function (request, response, next) {
        postManager.createPost(request.payload.sub, request.body.title, request.body.body, function (error, createdPostId) {
            if (error) {
                next(error)
            } else {
                response.status(201).json(createdPostId)

            }
        })
    })

    router.get("/", function (request, response, next) {
        postManager.getAllPosts(function (error, posts) {
            if (error) {
                next(error)
            } else {
                response.status(200).json(posts)
            }
        })
    })

    router.get("/me", apiMiddleware.validateAccessToken, function (request, response, next) {

        postManager.getPostsWithAccountId(request.payload.sub, function (error, posts) {
            if (error) {
                next(error)
            } else {
                response.status(200).json(posts)
            }
        })
    })

    router.delete("/:id", apiMiddleware.validateAccessToken, function (request, response, next) {
        const postId = request.params.id
        postManager.deletePost(request.payload.sub, postId, function (error) {
            if (error) {
                next(error)
            } else {
                response.sendStatus(204)
            }
        })
    })

    router.get("/:id", function (request, response, next) {
        const postId = request.params.id
        postManager.getPost(postId, function (error, post) {
            if (error) {
                next(error)
            } else {
                response.status(200).json(post)
            }

        })
    })

    router.put("/:id", apiMiddleware.validateAccessToken, function (request, response, next) {
        const postId = request.params.id
        const title = request.body.title
        const postBody = request.body.body

        postManager.editPost(request.payload.sub, postId, title, postBody, function (error, post) {
            if (error) {
                next(error)
            } else {
                response.status(200).json(post)
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