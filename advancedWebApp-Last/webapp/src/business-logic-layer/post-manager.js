const { BusinessError, BusinessErrorType } = require("./business-error")

module.exports = function ({ postRepository, postValidator }) {
    return {

        getAllPosts: function (callback) {
            postRepository.getAllPosts(function (error, posts) {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error getting all posts"), null)
                } else {
                    callback(null, posts)
                }
            })

        },

        createPost: function (accountId, title, body, callback) {
            postValidator.validatePost(title, body, function (error) {
                if (error) {
                    callback(error, null)
                } else {
                    postRepository.createPost(title, body, accountId, function (error, postId) {
                        if (error) {
                            callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error creating post"), null)
                        } else {
                            callback(null, postId)
                        }
                    })
                }
            })
        },

        editPost: function (accountId, postId, title, body, callback) {
            postValidator.validatePost(title, body, (error) => {
                if (error) {
                    callback(error, null)
                } else {
                    this.getPost(postId, function (error, post) {
                        postValidator.isOwner(accountId, post.accountId, function (error, isOwner) {
                            if (error) {
                                callback(error, null)
                            }
                            else {
                                postRepository.editPost(post.id, title, body, function (error, editedPostId) {
                                    if (error) {
                                        callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error editing post"), null)
                                    } else {
                                        callback(null, editedPostId)
                                    }
                                })
                            }
                        })
                    })
                }
            })


        },

        deletePost: function (accountId, id, callback) {
            this.getPost(id, (error, post) => {
                postValidator.isOwner(accountId, post.accountId, function (error, isOwner) {
                    if (error) {
                        callback(error, null)
                    } else {
                        postRepository.deletePost(id, function (error) {
                            if (error) {
                                callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error deleting post"), null)
                            } else {
                                callback(null, null)
                            }
                        })
                    }
                })
            })


        },

        getPost: function (id, callback) {
            postRepository.getPost(id, function (error, post) {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error getting post"), null)
                }
                else {
                    callback(null, post)
                }
            })
        },

        getPostsWithAccountId: function (accountId, callback) {
            postRepository.getPostsWithAccountId(accountId, function (error, posts) {
                if (error) {
                    callback(new BusinessError(BusinessErrorType.DATA_LAYER_ERROR, "Error getting post"), null)
                }
                else {
                    callback(null, posts)
                }
            })
        },


    }
}