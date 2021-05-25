var editPostPage = document.querySelector("#edit-post-page")
function updateEditPostPage(postId) {
	get("/posts/" + postId)
		.then(post => {

			if (!post) {
				alert("Post not found!")
				changePage("/posts")
				return
			}

			if (post.accountId == getUserInfo().accountId) {
				editPostPage.dataset["postId"] = post.id
				document.getElementById("edit-post-title").value = post.title
				document.getElementById("edit-post-body").value = post.body
			} else {
				alert("Not your post!")
				changePage("/posts/" + postId)
			}
		}).catch(handleError)

}

const editPostForm = document.querySelector("#edit-post-page form")

editPostForm.addEventListener("submit", e => {
	e.preventDefault()

	const postId = e.target.closest("#edit-post-page").dataset["postId"]
	const title = document.getElementById("edit-post-title").value
	const content = document.getElementById("edit-post-body").value

	put("/posts/" + postId, {
		title: title,
		body: content,
	})
		.then(post => {
			alert("Post edited!")
			changePage("/posts/" + postId)
		})
		.catch(handleError)
})