const sequelize = require("../sequelize/db.js")
const Post = require("../models/post-model")
const Account = require("../models/account-model")
const { DataTypes } = require("sequelize")

const Comment = sequelize.define('comments', {
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postid: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

})
Comment.belongsTo(Account, { foreignKey: 'accountId' })
Comment.belongsTo(Post, { foreignKey: 'postid' })
module.exports = Comment