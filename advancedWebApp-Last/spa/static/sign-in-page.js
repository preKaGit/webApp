document.addEventListener("DOMContentLoaded", function() {

    const signInForm = document.querySelector("#sign-in-page form")

    signInForm.addEventListener("submit", function(event) {
        event.preventDefault()


        const username = document.getElementById("sign-in-username").value
        const password = document.getElementById("sign-in-password").value

        authorize(username, password)
            .then(response => {
                alert("Success")
                onSignedIn()
                changePage("/")
            })
            .catch(handleError)


    })

})