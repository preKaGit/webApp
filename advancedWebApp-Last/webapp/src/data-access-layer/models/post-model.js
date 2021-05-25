const sequelize = require("../sequelize/db.js")
const Account = require("../models/account-model")
const { DataTypes } = require("sequelize")

const Post = sequelize.define("posts", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

})

Post.belongsTo(Account, { foreignKey: 'accountId' })

module.exports = Post