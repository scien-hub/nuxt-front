export const loadToken = () => {
    return localStorage.getItem("token")
}

export const setToken = (token: string | null) => {
    if (token) {
        localStorage.setItem("token", token)
    } else {
        localStorage.removeItem("token")
    }
}
