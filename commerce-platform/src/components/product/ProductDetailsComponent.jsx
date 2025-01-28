import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {getProductById} from "../../services/ProductService.js";
import Slider from "react-slick";
import ImageZoom from "react-image-zooom"

function ProductDetailsComponent() {
    window.scrollTo({top:0,left:0,behavior:'instant'})
    let horizontalSlider = useRef(null);
    let verticalSlider = useRef(null);
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)
    const currency = JSON.parse(localStorage.getItem("actualCurrency"));
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [productImages, setProductImages] = useState([])
    useEffect(() => {
        setNav1(horizontalSlider)
        setNav2(verticalSlider)
    }, []);
    useEffect(() => {
        getProductById(id).then((response) => {
            let productResponse = response.data;
            productResponse.price = productResponse.price.toFixed(2)
            productResponse.imageName = productResponse.imageName.substring(0,productResponse.imageName.indexOf('.')) + ".png"
            setProductImages(["1_" + productResponse.imageName, "2_" + productResponse.imageName, "3_" + productResponse.imageName, "4_" + productResponse.imageName])
            setProduct(productResponse)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log(product)

    function SampleArrow(props) {
        const {direction, className, style, onClick} = props;
        return (
            <div onClick={onClick} className="slider-arrow">
                <i className={"fa-solid fa-angle-" + direction + " fa-lg"}></i>
            </div>
        );
    }

    const verticalSliderSettings = {
        infinite: true,
        vertical: true,
        centerMode: true,
        centerPadding: 0,
        prevArrow: <SampleArrow direction="up"/>,
        nextArrow: <SampleArrow direction="down"/>,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        waitForAnimate: false
    }
    const horizontalSliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };

    return (
        <div>
            <div id="breadcrumb" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumb-tree">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">All Categories</a></li>
                                <li><a href="#">Accessories</a></li>
                                <li><a href="#">Headphones</a></li>
                                <li className="active">{product.name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 d-none d-md-block">
                            <div className="vertical-slider-container">
                                <Slider {...verticalSliderSettings}
                                        asNavFor={nav1}
                                        ref={slider => (verticalSlider = slider)}
                                >
                                    {productImages.map((image, index) =>
                                        <div key={index}>
                                            <img alt=""
                                                 src={"/img/" + image}/>
                                        </div>
                                    )}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="slider-container">
                                <Slider {...horizontalSliderSettings}
                                        asNavFor={nav2}
                                        ref={slider => (horizontalSlider = slider)}
                                >
                                    {productImages.map((image, index) =>
                                        <div key={index}>
                                            <ImageZoom className="bg-white" alt="zoom"
                                                       src={"/img/" + image}
                                                       zoom="300"
                                            />
                                        </div>
                                    )}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-md-4" style={{marginLeft:"40px"}}>
                            <div className="product-details">
                                <h2 className="product-name">{product.name}</h2>
                                <div>
                                    <div className="product-rating">
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star-o"/>
                                    </div>
                                    <a className="review-link" href="#">10 Review(s) | Add your review</a>
                                </div>
                                <div>
                                    <h3 className="product-price">{currency.symbol + " " + (product.price)}</h3>
                                    <span className="product-available">In Stock</span>
                                </div>
                                <p>{product.description}</p>
                                <div className="product-options">
                                    <label>
                                        Size
                                        <select className="input-select">
                                            <option value={0}>X</option>
                                        </select>
                                    </label>
                                    <label>
                                        Color
                                        <select className="input-select">
                                            <option value={0}>Red</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="add-to-cart">
                                    <div className="qty-label">
                                        Qty
                                        <div className="input-number">
                                            <input type="number"/>
                                            <span className="qty-up">+</span>
                                            <span className="qty-down">-</span>
                                        </div>
                                    </div>
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"/> add to cart
                                    </button>
                                </div>
                                <ul className="product-btns">
                                    <li><a href="#"><i className="fa fa-heart-o"/> add to wishlist</a></li>
                                    <li><a href="#"><i className="fa fa-exchange"/> add to compare</a></li>
                                </ul>
                                <ul className="product-links">
                                    <li>Category:</li>
                                    <li><a href="#">Headphones</a></li>
                                    <li><a href="#">Accessories</a></li>
                                </ul>
                                <ul className="product-links">
                                    <li>Share:</li>
                                    <li><a href="#"><i className="fa fa-facebook"/></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"/></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"/></a></li>
                                    <li><a href="#"><i className="fa fa-envelope"/></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div id="product-tab">
                                <ul className="tab-nav">
                                    <li className="active">
                                        <a data-toggle="tab" href="#tab1">Description</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#tab2">Details</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#tab3">Reviews (3)</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="tab1" className="tab-pane fade show active">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab2" className="tab-pane fade show">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab3" className="tab-pane fade show">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div id="rating">
                                                    <div className="rating-avg">
                                                        <span>4.5</span>
                                                        <div className="rating-stars">
                                                            <i className="fa fa-star"/>
                                                            <i className="fa fa-star"/>
                                                            <i className="fa fa-star"/>
                                                            <i className="fa fa-star"/>
                                                            <i className="fa fa-star-o"/>
                                                        </div>
                                                    </div>
                                                    <ul className="rating">
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div style={{width: '80%'}}/>
                                                            </div>
                                                            <span className="sum">3</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star-o"/>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div style={{width: '60%'}}/>
                                                            </div>
                                                            <span className="sum">2</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star-o"/>
                                                                <i className="fa fa-star-o"/>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div/>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star-o"/>
                                                                <i className="fa fa-star-o"/>
                                                                <i className="fa fa-star-o"/>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div/>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"/>
                                                                <i className="fa fa-star-o"/>
                                                                <i className="fa fa-star-o"/>
                                                                <i className="fa fa-star-o"/>
                                                                <i className="fa fa-star-o"/>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div/>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div id="reviews">
                                                    <ul className="reviews">
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star-o empty"/>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                    elit, sed do eiusmod tempor incididunt ut labore et
                                                                    dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star-o empty"/>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                    elit, sed do eiusmod tempor incididunt ut labore et
                                                                    dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star"/>
                                                                    <i className="fa fa-star-o empty"/>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                    elit, sed do eiusmod tempor incididunt ut labore et
                                                                    dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="reviews-pagination">
                                                        <li className="active">1</li>
                                                        <li><a href="#">2</a></li>
                                                        <li><a href="#">3</a></li>
                                                        <li><a href="#">4</a></li>
                                                        <li><a href="#"><i className="fa fa-angle-right"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div id="review-form">
                                                    <form className="review-form">
                                                        <input className="input" type="text" placeholder="Your Name"/>
                                                        <input className="input" type="email" placeholder="Your Email"/>
                                                        <textarea className="input" placeholder="Your Review"
                                                                  defaultValue={""}/>
                                                        <div className="input-rating">
                                                            <span>Your Rating: </span>
                                                            <div className="stars">
                                                                <input id="star5" name="rating" defaultValue={5}
                                                                       type="radio"/><label htmlFor="star5"/>
                                                                <input id="star4" name="rating" defaultValue={4}
                                                                       type="radio"/><label htmlFor="star4"/>
                                                                <input id="star3" name="rating" defaultValue={3}
                                                                       type="radio"/><label htmlFor="star3"/>
                                                                <input id="star2" name="rating" defaultValue={2}
                                                                       type="radio"/><label htmlFor="star2"/>
                                                                <input id="star1" name="rating" defaultValue={1}
                                                                       type="radio"/><label htmlFor="star1"/>
                                                            </div>
                                                        </div>
                                                        <button className="primary-btn">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h3 className="title">Related Products</h3>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="product">
                                <div className="product-img">
                                    <img src="/img/product01.png" alt=""/>
                                    <div className="product-label">
                                        <span className="sale">-30%</span>
                                    </div>
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del
                                        className="product-old-price">$990.00</del></h4>
                                    <div className="product-rating">
                                    </div>
                                    <div className="product-btns">
                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"/><span
                                            className="tooltipp">add to wishlist</span></button>
                                        <button className="add-to-compare"><i className="fa fa-exchange"/><span
                                            className="tooltipp">add to compare</span></button>
                                        <button className="quick-view"><i className="fa fa-eye"/><span
                                            className="tooltipp">quick view</span></button>
                                    </div>
                                </div>
                                <div className="add-to-cart">
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"/> add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="product">
                                <div className="product-img">
                                    <img src="/img/product02.png" alt=""/>
                                    <div className="product-label">
                                        <span className="new">NEW</span>
                                    </div>
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del
                                        className="product-old-price">$990.00</del></h4>
                                    <div className="product-rating">
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                    </div>
                                    <div className="product-btns">
                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"/><span
                                            className="tooltipp">add to wishlist</span></button>
                                        <button className="add-to-compare"><i className="fa fa-exchange"/><span
                                            className="tooltipp">add to compare</span></button>
                                        <button className="quick-view"><i className="fa fa-eye"/><span
                                            className="tooltipp">quick view</span></button>
                                    </div>
                                </div>
                                <div className="add-to-cart">
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"/> add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="product">
                                <div className="product-img">
                                    <img src="/img/product03.png" alt=""/>
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del
                                        className="product-old-price">$990.00</del></h4>
                                    <div className="product-rating">
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star-o"/>
                                    </div>
                                    <div className="product-btns">
                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"/><span
                                            className="tooltipp">add to wishlist</span></button>
                                        <button className="add-to-compare"><i className="fa fa-exchange"/><span
                                            className="tooltipp">add to compare</span></button>
                                        <button className="quick-view"><i className="fa fa-eye"/><span
                                            className="tooltipp">quick view</span></button>
                                    </div>
                                </div>
                                <div className="add-to-cart">
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"/> add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="product">
                                <div className="product-img">
                                    <img src="/img/product04.png" alt=""/>
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del
                                        className="product-old-price">$990.00</del></h4>
                                    <div className="product-rating">
                                    </div>
                                    <div className="product-btns">
                                        <button className="add-to-wishlist"><i className="fa fa-heart-o"/><span
                                            className="tooltipp">add to wishlist</span></button>
                                        <button className="add-to-compare"><i className="fa fa-exchange"/><span
                                            className="tooltipp">add to compare</span></button>
                                        <button className="quick-view"><i className="fa fa-eye"/><span
                                            className="tooltipp">quick view</span></button>
                                    </div>
                                </div>
                                <div className="add-to-cart">
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"/> add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="newsletter" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="newsletter">
                                <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                                <form>
                                    <input className="input" type="email" placeholder="Enter Your Email"/>
                                    <button className="newsletter-btn"><i className="fa fa-envelope"/> Subscribe
                                    </button>
                                </form>
                                <ul className="newsletter-follow">
                                    <li>
                                        <a href="#"><i className="fa fa-facebook"/></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-twitter"/></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-instagram"/></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-pinterest"/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsComponent;