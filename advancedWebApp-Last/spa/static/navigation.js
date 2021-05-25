changePage(window.location.pathname)

function handleClickOnAnchor(target) {
	const uri = target.getAttribute("href")
	changePage(uri)
}

document.addEventListener("click", e => {
	if (e.target.nodeName == "A") {
		e.preventDefault()
		handleClickOnAnchor(e.target)
	}
})

window.addEventListener('popstate', function (event) {
	const state = event.state
	changePage(state.uri)
})

function changePage(uri) {

	// Hide current page.
	document.querySelectorAll(".current-page").forEach(elem => elem.classList.remove("current-page"))
	var uriSplit = uri.split("/")

	var pageId = ""

	if (uri == "/") {
		pageId = "home-page"
	} else if (uri == "/sign-up") {
		pageId = "sign-up-page"
	} else if (uri == "/sign-in") {
		pageId = "sign-in-page"
	}
	else if (uri == "/posts") {
		pageId = "show-posts-page"
		clearCreatePostForm()
		updateShowPostPage()
	}
	else if (uriSplit.length == 3 && uriSplit[1] == "posts") {
		// Specific post
		pageId = "specific-post-page"
		const postId = uriSplit[2]
		getSpecificPost(postId)
	}
	else if (uri == "/create-post") {
		pageId = "create-post-page"
	}
	else if (uri == "/your-posts") {
		if (getToken()) {
			pageId = "your-posts-page"
			getYourPosts()
		} else {
			alert("Not authorized")
			changePage("/")
		}
	}
	else if (uriSplit.length == 4 && uriSplit[1] == "posts" && uriSplit[3] == "edit") {
		// Edit post
		if (getToken()) {
			const postId = uriSplit[2]
			pageId = "edit-post-page"
			updateEditPostPage(postId)
		} else {
			alert("Not authorized")
			changePage("/posts")
		}

	} else {
		pageId = "page-404"
	}

	var element = document.querySelector("#" + pageId)
	if (element)
		element.classList.add("current-page")

	history.pushState({ uri: uri }, "", uri)

}