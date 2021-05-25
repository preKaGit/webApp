const API_URL = "http://localhost:8080/api"

const TOKEN_KEY = "accessToken"
const USER_INFO_KEY = "user_info"


function get(endpoint) {
    setIsLoading(true)
    var headers = getHeaders()
    return fetch(API_URL + endpoint, {
        method: "GET",
        headers: headers
    })
        .then(response => {
            setIsLoading(false)
            if (response) {
                if (response.errorType)
                    throw response
                else
                    return response.json()
            }
        })
}

function put(endpoint, body) {
    setIsLoading(true)
    return fetch(API_URL + endpoint, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setIsLoading(false)
            if (data) {
                if (data.errorType)
                    throw data
                else
                    return data
            }
        })
}

function post(endpoint, body) {
    setIsLoading(true)
    return fetch(API_URL + endpoint, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.status != 204) {
                return response.json()
            }
        })
        .then(data => {
            setIsLoading(false)
            if (data) {
                if (data.errorType)
                    throw data
                else
                    return data
            }
        })
}

function deleteReq(endpoint) {
    setIsLoading(true)
    return fetch(API_URL + endpoint, {
        method: "DELETE",
        headers: getHeaders()
    })
        .then(response => {
            if (response.status != 204) {
                return response.json()
            }
        })
        .then(data => {
            setIsLoading(false)
            if (data) {
                if (data.errorType)
                    throw data
                else
                    return data
            }
        })
}

function getHeaders() {
    var headers = {
        "Content-Type": "application/json"
    }
    var accessToken = getToken()
    if (accessToken) {
        headers["Authorization"] = "Bearer " + accessToken
    }
    return headers
}

function handleError(error) {
    setIsLoading(false)
    alert(error.description)
}

function authorize(username, password) {
    return post("/tokens", {
        grant_type: "password",
        username,
        password
    })
        .then(data => {
            setToken(data.access_token, data.id_token)
        })
}

function setToken(accessToken, idToken) {

    sessionStorage.setItem(TOKEN_KEY, accessToken)
    sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(jwt_decode(idToken)))
}

function getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
}

function getUserInfo() {
    let userInfo = JSON.parse(sessionStorage.getItem(USER_INFO_KEY))
    return {
        accountId: userInfo?.sub,
        username: userInfo?.preferred_username
    }
}

function setIsLoading(loading) {
    var loadingElem = document.querySelector("#loading")
    if (loading) {
        loadingElem.classList.add("visible")
    } else {
        loadingElem.classList.remove("visible")
    }
}