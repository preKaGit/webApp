function updateShowPostPage() {
	const ul = document.querySelector("#show-posts-page ul")
	ul.innerText = ""

	get("/posts")
		.then(posts => {

			for (const post of posts) {
				var liElem = document.createElement('li')
				var aElem = document.createElement("a")
				aElem.setAttribute("href", `/posts/${post.id}">${post.title}`)
				liElem.appendChild(aElem)
				ul.appendChild(liElem)
				aElem.innerText = post.title
			}

		})
		.catch(handleError)
}