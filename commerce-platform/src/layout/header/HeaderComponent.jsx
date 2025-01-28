import React, {useEffect, useState} from 'react';
import {getAllCurrencies, setActualCurrency} from "../../services/PricingService.js";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function HeaderComponent() {
    const actualCurrency = JSON.parse(localStorage.getItem("actualCurrency"));
    const [currencies, setCurrencies] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getAllCurrencies().then((response) => {
            setCurrencies(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    function changeActualCurrency(e, currency) {
        e.preventDefault()
        setActualCurrency(currency.name).then(() => {
            localStorage.setItem("actualCurrency", JSON.stringify(currency))
        }).catch((error) => {
            console.log(error)
        })
        const location = window.location
        const fullPath = location.pathname + location.search
        navigate(fullPath, {state: {reload: true}})
        window.location.reload()
    }

    function logout() {
        Cookies.remove("token")
        navigate("/login")
    }

    return (
        <header>
            <div id="top-header">
                <div className="container"
                     style={{display: "flex", justifyContent: "center", justifyItems: "center"}}>
                    <ul className="header-links pull-left">
                        <li><a href="#"><i className="fa fa-phone"></i> +212 6 00 00 00 00</a></li>
                        <li><a href="#"><i className="fa fa-envelope-o"></i> swain@support.com</a></li>
                        <li><a href="#"><i className="fa fa-map-marker"></i> Morocco</a></li>
                    </ul>
                    <ul className="header-links pull-right" style={{marginLeft: "auto"}}>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownCurrencies"
                               aria-expanded="false">
                                <i className="fa-regular fa-money-bill-1"></i>
                                {actualCurrency.name}
                            </a>
                            <ul id="currencies-dropdown" className="dropdown-menu" aria-labelledby="dropdownCurrencies">
                                {currencies.map((currency, index) =>
                                    <li key={index} className="dropdown-item"
                                        onClick={(e) => changeActualCurrency(e, currency)}>
                                        <i className={"fi fi-" + currency.code.toLowerCase()}></i>
                                        <a href="">{currency.name}</a>
                                    </li>
                                )}
                            </ul>
                        </li>
                        <li>
                            <a href=""><i className="fa fa-user-o"></i> My Account</a>
                        </li>
                        <li>
                            <a href="" onClick={logout}><i className="fa fa-sign-out"></i> Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="header">
                <div className="container">
                <div className="row">
                        <div className="col-lg-3">
                            <div className="header-logo">
                                <a href={"/home"} className="website-logo">
                                    <img src="/img/swain_logo_5.png" alt="website_logo" style={{width: "50%"}}/>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="header-search">
                                <form>
                                    <select className="input-select">
                                        <option value="0">All Categories</option>
                                        <option value="1">Category 1</option>
                                        <option value="2">Category 2</option>
                                    </select>
                                    <input className="input" placeholder="Search here"/>
                                    <button className="search-btn">Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 clearfix">
                            <div className="header-ctn">
                                <div>
                                    <a href="#">
                                        <i className="fa fa-heart-o"></i>
                                        <span>Your Wishlist</span>
                                        <div className="qty">2</div>
                                    </a>
                                </div>
                                <div className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Your Cart</span>
                                        <div className="qty">3</div>
                                    </a>
                                    <div className="cart-dropdown">
                                        <div className="cart-list">
                                            <div className="product-widget">
                                                <div className="product-img">
                                                    <img src="./img/product01.png" alt=""/>
                                                </div>
                                                <div className="product-body">
                                                    <h3 className="product-name"><a href="#">product name goes
                                                        here</a></h3>
                                                    <h4 className="product-price"><span className="qty">1x</span>$980.00
                                                    </h4>
                                                </div>
                                                <button className="delete"><i className="fa fa-close"></i></button>
                                            </div>

                                            <div className="product-widget">
                                                <div className="product-img">
                                                    <img src="./img/product02.png" alt=""/>
                                                </div>
                                                <div className="product-body">
                                                    <h3 className="product-name"><a href="#">product name goes
                                                        here</a></h3>
                                                    <h4 className="product-price"><span className="qty">3x</span>$980.00
                                                    </h4>
                                                </div>
                                                <button className="delete"><i className="fa fa-close"></i></button>
                                            </div>
                                        </div>
                                        <div className="cart-summary">
                                            <small>3 Item(s) selected</small>
                                            <h5>SUBTOTAL: $2940.00</h5>
                                        </div>
                                        <div className="cart-btns">
                                            <a href="#">View Cart</a>
                                            <a href="#">Checkout <i className="fa fa-arrow-circle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-toggle">
                                    <a href="#">
                                        <i className="fa fa-bars"></i>
                                        <span>Menu</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav id="navigation">
                <div className="container">
                    <div id="responsive-nav">
                        <ul className="main-nav nav navbar-nav flex-row p-4">
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Hot Deals</a></li>
                            <li><a href="#">Categories</a></li>
                            <li><a href="#">Laptops</a></li>
                            <li><a href="#">Smartphones</a></li>
                            <li><a href="#">Cameras</a></li>
                            <li><a href="#">Accessories</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponent;