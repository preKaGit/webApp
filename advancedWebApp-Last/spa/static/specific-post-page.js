function getSpecificPost(postId) {
    var specificPostElem = document.querySelector("#specific-post-page")
    var cardContent = specificPostElem.querySelector(".card-content")
    cardContent.setAttribute("hidden", true)

    get("/posts/" + postId)
        .then(post => {
            if (!post) {
                alert("Post not found!")
                changePage("/posts")
                return
            }

            specificPostElem.setAttribute("data-post-id", post.id)
            document.querySelector("#specific-post-title").innerText = post.title
            document.querySelector("#specific-post-body").innerText = post.body
            document.querySelector("#edit-post-btn").setAttribute("href", "/posts/" + post.id + "/edit")



            var postActionsElem = document.querySelector("#specific-post-actions")
            if (getUserInfo().accountId == post.accountId) {
                postActionsElem.removeAttribute("hidden")
            } else {
                postActionsElem.setAttribute("hidden", true)
            }

            cardContent.removeAttribute("hidden")
        })
        .catch(error => {
            handleError(error)
            changePage("/posts")
        })
}

document.querySelector("#delete-post-btn").addEventListener("click", e => {
    e.target.setAttribute("disabled", true)
    const postId = e.target.closest("#specific-post-page").dataset["postId"]
    deleteReq("/posts/" + postId)
        .then(() => {
            alert("Post deleted")
            changePage("/posts")
            e.target.removeAttribute("disabled")
        })
        .catch(error => {
            e.target.removeAttribute("disabled")
            handleError(error)
        })
})