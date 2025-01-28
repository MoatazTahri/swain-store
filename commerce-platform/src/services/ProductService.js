import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
})

export const getAllProducts = () => {
    return api.get(API_URL + "/product/all");
}

export const getProductById = (id) => {
    return api.get(API_URL + "/product/" + id);
}

export const getProductsOfCategories = (categories = []) => {
    const params = new URLSearchParams();
    categories.map(categoryName => {
        params.append("category", categoryName)
    })
    const request = {
        params : params
    }
    return api.get(API_URL + "/product/all", request)
}

export const getProductsCountByCategories = () => {
    return api.get(API_URL + "/product/categories");
}