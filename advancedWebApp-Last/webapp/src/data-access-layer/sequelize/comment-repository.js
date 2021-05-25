const comment = require("../models/comment-model")
const Account = require("../models/account-model")
const Sequelize = require("sequelize")

module.exports = function ({ }) {
    return {

        getCommentsWithPostId: function (id, callback) {
            comment.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: Account,
                    where: { id: Sequelize.col("comments.accountId") },
                    attributes: ["username"]
                }],
                where: {
                    postid: id
                }
            }).then(function (comments) {
                comments.forEach(function (comment) {
                    comment.username = comment.account.username
                    delete comment.account
                })
                callback(null, comments)
            }).catch(function (error) {
                callback("databaseError", null)
            })

        },


        createCommentOnPostId: function (accountId, postId, body, callback) {
            comment.create({ comment: body, postid: postId, accountId: accountId })
                .then(function (comment) {
                    callback(null, comment)
                }).catch(function (error) {
                    callback("databaseError", null)
                })
        }
    }
}