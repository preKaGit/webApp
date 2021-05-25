module.exports = function ({ db }) {
    return {

        getAllPosts: function (callback) {

            const query = "SELECT posts.*, accounts.username FROM posts INNER JOIN accounts ON accounts.id = posts.accountId ORDER BY posts.id DESC"

            db.query(query, function (error, posts) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, posts)
                }

            })

        },

        getPost: function (postid, callback) {

            const query = "SELECT posts.*, accounts.username FROM posts INNER JOIN accounts ON accounts.id = posts.accountId WHERE posts.id = ?"
            const values = [postid]

            db.query(query, values, function (error, post) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, post[0])
                }
            })
        },

        createPost: function (title, body, accountId, callback) {
            const query = "INSERT INTO posts (title, body, accountId) VALUES (?,?,?)"
            const values = [title, body, accountId]

            db.query(query, values, function (error, createdPost) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, createdPost.insertId)
                }

            })
        },

        editPost: function (postId, title, body, callback) {
            const query = "UPDATE posts SET body = ?, title = ? WHERE id = ?"
            const values = [body, title, postId]
            db.query(query, values, function (error) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, postId)
                }
            })
        },

        deletePost: function (postId, callback) {
            const query = "DELETE FROM posts WHERE id = ?"
            const values = [postId]
            db.query(query, values, function (error) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, null)
                }
            })
        },

        getPostsWithAccountId: function (accountId, callback) {

            const query = "SELECT * FROM posts WHERE accountId = ?"
            const values = [accountId]
            db.query(query, values, function (error, posts) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, posts)
                }
            })

        }
    }
}