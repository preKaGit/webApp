const JWT_SECRET = "5kRh21AucYhm3but2s67jEIWSy1mJekN"
const JWT_IDSECRET = "5Ka452af"
const jwt = require("jsonwebtoken")



module.exports = function ({ }) {
    return {

        generateIDandAccessToken: function (account, callback) {
            const accessToken = jwt.sign({
                sub: account.id,
            },
                JWT_SECRET
            )
            const idToken = jwt.sign({
                sub: account.id,
                preferred_username: account.username
            },
                JWT_IDSECRET
            )
            callback(accessToken, idToken)

        },



    }
}