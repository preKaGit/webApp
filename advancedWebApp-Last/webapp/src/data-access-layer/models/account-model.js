const sequelize = require("../sequelize/db.js")
const { DataTypes } = require("sequelize")

const Account = sequelize.define("accounts", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Account