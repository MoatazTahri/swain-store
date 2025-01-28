import React, {useEffect, useState} from 'react';
import "../../assets/css/slick.css";
import "../../assets/css/nouislider.min.css"
import "../../assets/css/slick-theme.css"
import "../../assets/css/style.scss"
import {useLocation} from "react-router-dom";

function FooterComponent() {
    const [currentYear, setCurrentYear] = useState(0)
    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
    }, []);
    return (
        <footer id="footer">
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">About Us</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut.</p>
                                <ul className="footer-links">
                                    <li><a href="#"><i className="fa fa-map-marker"></i>Morocco</a></li>
                                    <li><a href="#"><i className="fa fa-phone"></i>+212 6 00 00 00 00</a></li>
                                    <li><a href="#"><i className="fa fa-envelope-o"></i>swain@support.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">Categories</h3>
                                <ul className="footer-links">
                                    <li><a href="#">Hot deals</a></li>
                                    <li><a href="#">Laptops</a></li>
                                    <li><a href="#">Smartphones</a></li>
                                    <li><a href="#">Cameras</a></li>
                                    <li><a href="#">Accessories</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">Information</h3>
                                <ul className="footer-links">
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Orders and Returns</a></li>
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">Service</h3>
                                <ul className="footer-links">
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">View Cart</a></li>
                                    <li><a href="#">Wishlist</a></li>
                                    <li><a href="#">Track My Order</a></li>
                                    <li><a href="#">Help</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bottom-footer" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <ul className="footer-payments">
                                <li><a href="#"><i className="fa fa-cc-visa"></i></a></li>
                                <li><a href="#"><i className="fa fa-credit-card"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-paypal"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-mastercard"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-discover"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-amex"></i></a></li>
                            </ul>
                            <span className="copyright">Copyright ©{currentYear} All rights reserved</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;