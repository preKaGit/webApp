const accounts = require("../models/account-model")
module.exports = function ({ }) {
    return {

        getAccountByUsername: function (username, callback) {
            accounts.findOne({
                raw: true,
                where: {
                    username: username,
                }
            }).then(function (account) {
                callback(null, account)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        },

        getPasswordByUsername: function (username, callback) {

            accounts.findOne({
                raw: true,
                where: { username: username },
            })
                .then(function (account) {
                    if (!account.password) {
                        callback("databaseError", null)
                    } else {
                        callback(null, account.password)
                    }
                })
                .catch(function (error) {
                    callback("databaseError", null)
                })
        },

        createAccount: function (username, password, callback) {

            accounts.create({ username: username, password: password }).then(function (account) {
                callback(null, account)
            }).catch(function (error) {
                callback("databaseError", null)
            })
        }
    }

}