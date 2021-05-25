const Post = require("../models/post-model")
const comment = require("../models/comment-model")
const Account = require("../models/account-model")
const Sequelize = require("sequelize")

module.exports = function ({ }) {
    return {

        getAllPosts: function (callback) {
            Post.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: Account,
                    where: { id: Sequelize.col("posts.accountId") },
                    attributes: ["username"]
                }],
            }).then(function (posts) {
                posts.forEach(function (post) {
                    post.username = post.account.username
                    delete post.account
                })
                callback(null, posts)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        },

        getPost: function (id, callback) {
            Post.findOne({
                raw: true,
                nest: true,
                include: [{
                    model: Account,
                    where: { id: Sequelize.col("posts.accountId") },
                    attributes: ["username"]
                }],
                where: {
                    id: id
                }
            }).then(function (post) {
                post.username = post.account.username
                delete post.account
                callback(null, post)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        },

        createPost: function (title, body, accountId, callback) {
            Post.create({ title: title, body: body, accountId: accountId }).then(function (createdPost) {
                callback(null, createdPost.id)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        },

        editPost: function (postId, title, body, callback) {
            Post.update({
                body: body,
                title: title
            }, {
                where: {
                    id: postId
                }
            }).then(function () {
                callback(null, postId)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        },

        deletePost: function (id, callback) {
            Post.destroy({
                where: {
                    id: id
                }

            }).then(function () {
                callback(null, null)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        },

        getPostsWithAccountId: function (id, callback) {
            Post.findAll({
                raw: true,
                where: {
                    accountId: id
                }
            }).then(function (posts) {
                callback(null, posts)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        }
    }
}