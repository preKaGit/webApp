const createPost = document.querySelector("#create-post-page form")
createPost.addEventListener("submit", function (event) {
	event.preventDefault()


	const title = document.getElementById("post-title").value
	const postBody = document.getElementById("post-body").value

	post("/posts/create-post", {
		title: title,
		body: postBody,
	})
		.then(createdPostId => {
			clearCreatePostForm()
			changePage("/posts/" + createdPostId)
			alert("Post created!")
		}).catch(handleError)
})

function clearCreatePostForm() {
	document.getElementById("post-title").value = ""
	document.getElementById("post-body").value = ""
}