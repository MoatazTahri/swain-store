import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
})

export const getActualCurrency = () => {
    return api.get(API_URL + "/pricing/current-currency")
}
export const setActualCurrency = (currencyName) => {
    return api.post(API_URL + "/pricing/change-currency/" + currencyName)
}
export const getAllCurrencies = () => {
    return api.get(API_URL + "/pricing/all-currencies")
}