module.exports = {
    get: (key) => {
        return JSON.parse(localStorage.getItem(key)) || {}
    },

    set: (key, value) => {
        localStorage.setItem(key,JSON.stringify(value))
    },

    contains:(key) => {
        return localStorage.getItem(key) != null
    }
}