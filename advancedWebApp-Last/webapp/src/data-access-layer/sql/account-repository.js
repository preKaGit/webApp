module.exports = function ({ db }) {
    return {

        getAccountByUsername: function (username, callback) {
            const query = "SELECT * FROM accounts WHERE username = ? LIMIT 1"
            const values = [username]

            db.query(query, values, function (error, account) {
                if (error) {
                    callback("databaseError", null)
                } else {
                    callback(null, account[0])
                }

            })
        },

        getPasswordByUsername: function (username, callback) {
            const query = "SELECT password FROM accounts WHERE username = ? "
            const values = [username]

            db.query(query, values, function (error, hash) {
                if (error) {
                    callback("databaseError", null)
                } else if (!hash) {
                    callback("dataBaseError", null)
                } else {
                    callback(null, hash[0].password)
                }
            })
        },

        createAccount: function (username, password, callback) {
            const query = "INSERT INTO accounts (username, password) VALUES (?, ?)"
            const values = [username, password]
            db.query(query, values, (error, response) => {
                if (error) {
                    callback("databaseError", null)
                } else {
                    this.getAccountByUsername(username, callback)
                }

            })

        }
    }

}