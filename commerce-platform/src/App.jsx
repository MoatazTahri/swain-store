import './App.css'
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "flag-icons/css/flag-icons.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/css/v4-shims.css"
import "./assets/css/slick.css";
import "./assets/css/nouislider.min.css"
import "./assets/css/slick-theme.css"
import "./assets/css/style.scss"
import HomePageComponent from "./components/home/HomePageComponent.jsx";
import StoreComponent from "./components/product/StoreComponent.jsx";
import {useEffect} from "react";
import {getActualCurrency} from "./services/PricingService.js";
import ProductDetailsComponent from "./components/product/ProductDetailsComponent.jsx";
import SliderComponent from "./SliderComponent.jsx";
import LoadingScreenComponent from "./layout/LoadingScreenComponent.jsx";
import HeaderComponent from "./layout/header/HeaderComponent.jsx";
import FooterComponent from "./layout/footer/FooterComponent.jsx";
import ProductFormComponent from "./components/product/productForm/ProductFormComponent.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import SignupForm from "./components/login/SignupForm.jsx";
import Cookies from "js-cookie";

function AppWithRoute() {
    const loc = useLocation();
    const pathsWithoutHeaderAndFooter = ['/', '/home', '/admin/products/create', '/login', '/register']
    const isPathIncluded = pathsWithoutHeaderAndFooter.includes(loc.pathname);

    useEffect(() => {
        getActualCurrency().then((response) => {
            localStorage.setItem("actualCurrency", JSON.stringify(response.data))
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    function isAuthenticated() {
        return Cookies.get("token") !== undefined
    }

    const ProtectedRoute = ({children}) => {
        if (!isAuthenticated()) {
            return <Navigate to="/login" state={{lastPath: loc.pathname}} replace/>
        }
        return <>{children}</>
    }

    return (
        <>
            {!isPathIncluded && <HeaderComponent/>}
            <Routes>
                {/* Unprotected routes */}
                <Route path="/login" Component={LoginForm}/>
                <Route path="/register" Component={SignupForm}/>
                <Route path="/home" Component={HomePageComponent}/>
                <Route path="/slider" Component={SliderComponent}/>
                <Route path="/" Component={LoadingScreenComponent}/>
                {/* Protected routes */}
                <Route path="/store" element={
                    <ProtectedRoute>
                        <StoreComponent key={location.key}/>
                    </ProtectedRoute>}/>
                <Route path="/product/:id" element={
                    <ProtectedRoute>
                        <ProductDetailsComponent/>
                    </ProtectedRoute>}/>
                <Route path="/admin/products/create" element={
                    <ProtectedRoute>
                        <ProductFormComponent/>
                    </ProtectedRoute>
                }/>
            </Routes>
            {!isPathIncluded && <FooterComponent/>}
        </>
    )
}

// This is to make the useLocation() works
export default function App() {
    return (
        <BrowserRouter>
            <AppWithRoute/>
        </BrowserRouter>
    )
}
