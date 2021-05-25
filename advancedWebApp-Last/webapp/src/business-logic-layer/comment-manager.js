const { BusinessError, BusinessErrorType } = require("./business-error")

module.exports = function({ commentValidator, commentRepository }) {
    return {


        getCommentsWithPostId: function(id, callback) {
            commentRepository.getCommentsWithPostId(id, function(error, comments) {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error getting comments"), null)
                } else {
                    callback(null, comments)
                }
            })
        },

        createCommentOnPostId: function(accountId, postId, comment, callback) {

            commentValidator.validateComment(comment, function(error) {
                if (error) {
                    callback(error, null)
                } else {
                    commentRepository.createCommentOnPostId(accountId, postId, comment, function(error, comment) {
                        if (error) {
                            callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error creating comment"), )
                        } else {
                            callback(null, comment)
                        }
                    })
                }

            })


        },
    }
}