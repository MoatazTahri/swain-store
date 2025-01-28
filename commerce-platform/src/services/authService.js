import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const register = (user = {}) => {
    return axios.post(API_URL + "/auth/register", user)
}

export const authenticate = (email, password) => {
    return axios.post(API_URL + "/auth/login", {email: email, password: password})
}