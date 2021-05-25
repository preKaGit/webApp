const MIN_USERNAME_LENGTH = 3
const MIN_PASSWORD_LENGTH = 3
const bcrypt = require('bcryptjs')

const { BusinessError, BusinessErrorType } = require('./business-error')

module.exports = function ({ accountRepository }) {
    return {

        validateNewAccount: function (username, password, callback) {
            if (username.length < MIN_USERNAME_LENGTH && password.length < MIN_PASSWORD_LENGTH) {
                return callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("Username must be atleast " + MIN_USERNAME_LENGTH +
                    " symbols and Password must be atleast " + MIN_PASSWORD_LENGTH + " symbols")))
            }
            if (username.length < MIN_USERNAME_LENGTH) {
                return callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("Username must be atleast " + MIN_USERNAME_LENGTH + " symbols")))
            }
            if (password.length < MIN_PASSWORD_LENGTH) {
                return callback(new BusinessError(BusinessErrorType.INVALID_DATA, ("Password must be atleast " + MIN_PASSWORD_LENGTH + " symbols")))
            }
            else {
                callback(null)
            }
        },

        checkCredentials: function (username, password, callback) {
            accountRepository.getPasswordByUsername(username, function (error, hash) {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.INVALID_DATA, "Wrong credentials"), null)
                } else {
                    bcrypt.compare(password, hash, function (bcryptError, result) {
                        if (result) {
                            accountRepository.getAccountByUsername(username, function (error, account) {
                                if (error) {
                                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error fetching account"), null)

                                } else {
                                    callback(null, account)
                                }
                            })
                        } else {
                            callback(new BusinessError(BusinessErrorType.INVALID_DATA, "Wrong credentials"), null)
                        }
                    })
                }

            })
        },

    }
}