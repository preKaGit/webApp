const bcrypt = require('bcryptjs')
const saltRounds = 10

const { BusinessError, BusinessErrorType } = require('./business-error')


module.exports = function ({ accountRepository, accountValidator }) {
    return {

        getAccountByUsername: function (username, callback) {
            accountRepository.getAccountByUsername(username, function (error, account) {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error fetching account"))

                } else {
                    callback(null, account)
                }
            })
        },

        createAccount: function (username, password, callback) {
            accountValidator.validateNewAccount(username, password, function (error) {
                if (error) {
                    callback(error, null)
                } else {
                    bcrypt.hash(password, saltRounds, function (bcryptErr, hash) {
                        if (bcryptErr) {
                            callback(new BusinessError(BusinessErrorType.INVALID_DATA, "Error creating account"), null)
                        } else {
                            accountRepository.createAccount(username, hash, function (error, account) {
                                if (error) {
                                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Username already exists"), null)
                                } else {
                                    callback(null, account)
                                }
                            })
                        }
                    })
                }
            })
        },
    }
}