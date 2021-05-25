if (getToken()) {
    onSignedIn()
}

document.querySelector("#signout-button").addEventListener("click", e => {
    sessionStorage.clear()
    document.querySelector("body").classList.remove("user-is-logged-in")
    alert("Signed out! :D")
    changePage("/")
})

function onSignedIn() {
    var userInfo = getUserInfo()
    document.querySelector("body").classList.add("user-is-logged-in")
    document.querySelectorAll(".username").forEach(elem => elem.innerText = userInfo.username)
}