document.addEventListener("DOMContentLoaded", function () {

    const signUpForm = document.querySelector("#sign-up-page form")

    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault()


        const username = document.getElementById("sign-up-username").value
        const password = document.getElementById("sign-up-password").value

        post("/account", {
            username,
            password
        })
            .then(response => {
                alert("Account created!")
                changePage("/sign-in")
            })
            .catch(handleError)

    })

})