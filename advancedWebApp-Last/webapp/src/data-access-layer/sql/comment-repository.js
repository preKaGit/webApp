module.exports = function ({ db }) {
    return {

        getCommentsWithPostId: function (postId, callback) {

            const query = "SELECT comments.*, accounts.username FROM comments INNER JOIN accounts ON accounts.id = comments.accountId WHERE comments.postid = ? ORDER BY comments.id "
            const values = [postId]
            db.query(query, values, function (error, comments) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, comments)
                }
            })
        },

        createCommentOnPostId: function (accountId, postId, body, callback) {

            const query = "INSERT INTO comments (comment, postid, accountId) VALUES (?,?,?)"
            const values = [body, postId, accountId]
            db.query(query, values, function (error, comment) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, comment)
                }
            })
        }
    }
}