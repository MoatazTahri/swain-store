import React, {useEffect, useState} from "react";
import {getProductsCountByCategories, getProductsOfCategories} from "../../services/ProductService.js";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";


function StoreComponent() {
    const [products, setProducts] = useState([])
    const [params] = useSearchParams()
    const [checkedCategories, setCheckedCategories] = useState([])
    const [categoriesCount, setCategoriesCount] = useState({})
    const currency = JSON.parse(localStorage.getItem("actualCurrency"));
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setCheckedCategories(params.getAll("category"))
    }, [params]);

    useEffect( () => {
        fetchProducts()
        if (location.state?.reload) {
            fetchProducts()
        }
    }, [currency]);

    useEffect(() => {
        getProductsCountByCategories().then((response) => {
            setCategoriesCount(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const fetchProducts = () => {
        getProductsOfCategories(params.getAll("category")).then((response) => {
            setProducts(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function goToDetails(productId) {
        navigate("/product/" + productId)
    }

    function handleCategory(e, categoryName) {
        const isChecked = e.target.checked;
        if (isChecked) {
            checkedCategories.push(categoryName.toLowerCase())
        } else {
            setCheckedCategories(checkedCategories.filter(category => category.toLowerCase() !== categoryName.toLowerCase()))
        }
    }

    function filter() {
        const params = new URLSearchParams();
        console.log(checkedCategories)
        checkedCategories.map(categoryName => {
            params.append("category", categoryName.toLowerCase())
        })
        navigate(`/store?${params.toString()}`)
        window.location.reload()
    }

    function noProductsFound(bool) {
        if (bool) return (
            <div className="fade-display no-product-found">
                <div className="">No products found</div>
                <img alt="not-found" src="/img/sad-cat.png"/>
            </div>
        )
    }

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
                                <li className="active">Headphones (227,490 Results)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div id="aside" className="col-md-3">
                            <div className="aside">
                                <h3 className="aside-title">Categories</h3>
                                <form>
                                    <div className="checkbox-filter">
                                        {Object.keys(categoriesCount).map((key, index) =>
                                            <div key={index} className="input-checkbox">
                                                <input type="checkbox"
                                                       id={key}
                                                       defaultChecked={checkedCategories.some(x => x.toLowerCase() === key.toLowerCase())}
                                                       onChange={(e) => handleCategory(e, key)}/>
                                                <label htmlFor={key}>
                                                    <span></span>
                                                    {key}
                                                    <small> ({categoriesCount[key]})</small>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 text-center">
                                        <button type="button" className="primary-btn" onClick={filter}>Apply</button>
                                    </div>
                                </form>
                            </div>
                            <div className="aside">
                                <h3 className="aside-title">Price</h3>
                                <div className="price-filter">
                                    <div id="price-slider" className="noUi-target noUi-ltr noUi-horizontal">
                                        <div className="noUi-base">
                                            <div className="noUi-origin" style={{left: "0%"}}>
                                                <div className="noUi-handle noUi-handle-lower" data-handle="0"
                                                     tabIndex="0"
                                                     role="slider" aria-orientation="horizontal" aria-valuemin="0.0"
                                                     aria-valuemax="100.0" aria-valuenow="0.0" aria-valuetext="1.00"
                                                     style={{zIndex: 5}}></div>
                                            </div>
                                            <div className="noUi-connect" style={{left: "0%", right: "0%"}}></div>
                                            <div className="noUi-origin" style={{left: "100%"}}>
                                                <div className="noUi-handle noUi-handle-upper" data-handle="1"
                                                     tabIndex="0"
                                                     role="slider" aria-orientation="horizontal" aria-valuemin="0.0"
                                                     aria-valuemax="100.0" aria-valuenow="100.0" aria-valuetext="999.00"
                                                     style={{zIndex: 4}}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-number price-min">
                                        <input id="price-min" type="number"/>
                                        <span className="qty-up">+</span>
                                        <span className="qty-down">-</span>
                                    </div>
                                    <span>-</span>
                                    <div className="input-number price-max">
                                        <input id="price-max" type="number"/>
                                        <span className="qty-up">+</span>
                                        <span className="qty-down">-</span>
                                    </div>
                                </div>
                            </div>
                            <div className="aside">
                                <h3 className="aside-title">Brand</h3>
                                <div className="checkbox-filter">
                                    <div className="input-checkbox">
                                        <input type="checkbox" id="brand-1"/>
                                        <label htmlFor="brand-1">
                                            <span></span>
                                            SAMSUNG
                                            <small>(578)</small>
                                        </label>
                                    </div>
                                    <div className="input-checkbox">
                                        <input type="checkbox" id="brand-2"/>
                                        <label htmlFor="brand-2">
                                            <span></span>
                                            LG
                                            <small>(125)</small>
                                        </label>
                                    </div>
                                    <div className="input-checkbox">
                                        <input type="checkbox" id="brand-3"/>
                                        <label htmlFor="brand-3">
                                            <span></span>
                                            SONY
                                            <small>(755)</small>
                                        </label>
                                    </div>
                                    <div className="input-checkbox">
                                        <input type="checkbox" id="brand-4"/>
                                        <label htmlFor="brand-4">
                                            <span></span>
                                            SAMSUNG
                                            <small>(578)</small>
                                        </label>
                                    </div>
                                    <div className="input-checkbox">
                                        <input type="checkbox" id="brand-5"/>
                                        <label htmlFor="brand-5">
                                            <span></span>
                                            LG
                                            <small>(125)</small>
                                        </label>
                                    </div>
                                    <div className="input-checkbox">
                                        <input type="checkbox" id="brand-6"/>
                                        <label htmlFor="brand-6">
                                            <span></span>
                                            SONY
                                            <small>(755)</small>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="aside">
                                <h3 className="aside-title">Top selling</h3>
                                {products.slice(0, 3).map(product =>
                                    <div key={product.id} className="product-widget">
                                        <div className="product-img">
                                            <img src={"/img/" + product.imageName} alt=""/>
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">{product.category}</p>
                                            <h3 className="product-name">
                                                <a href="" onClick={() => navigate(`/product/${product.id}`)}>
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <h4 className="product-price">{currency.symbol + " " + (product.price).toFixed(2)}</h4>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id="store" className="col-md-9">

                            <div className="store-filter clearfix">
                                <div className="store-sort">
                                    <label>
                                        Sort By:
                                        <select className="input-select">
                                            <option value="0">Popular</option>
                                            <option value="1">Position</option>
                                        </select>
                                    </label>

                                    <label>
                                        Show:
                                        <select className="input-select">
                                            <option value="0">20</option>
                                            <option value="1">50</option>
                                        </select>
                                    </label>
                                </div>
                                <ul className="store-grid">
                                    <li className="active"><i className="fa fa-th"></i></li>
                                    <li><a href="#"><i className="fa fa-th-list"></i></a></li>
                                </ul>
                            </div>
                            <div className="row">
                                {products.map(product =>
                                    <div key={product.id} className="col-md-4 col-xs-6">
                                        <div className="product">
                                            <div className="product-img">
                                                <img src={"/img/" + product.imageName} alt=""/>
                                                <div className="product-label">
                                                    <span className="sale">-30%</span>
                                                    <span className="new">NEW</span>
                                                </div>
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">{product.category}</p>
                                                <h3 className="product-name"><a href="#">{product.name}</a></h3>
                                                <h4 className="product-price">{currency.symbol + " " + (product.price).toFixed(2)}
                                                    <del
                                                        className="product-old-price">{currency.symbol + " " + Math.round(product.price * 1.4)}</del>
                                                </h4>
                                                <div className="product-rating">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-empty"></i>
                                                </div>
                                                <div className="product-btns">
                                                    <button className="add-to-wishlist"><i
                                                        className="fa fa-heart-o"></i><span
                                                        className="tooltipp">add to wishlist</span></button>
                                                    <button className="add-to-compare"><i
                                                        className="fa fa-exchange"></i><span
                                                        className="tooltipp">add to compare</span></button>
                                                    <button className="quick-view"><i className="fa fa-eye"></i><span
                                                        className="tooltipp">quick view</span></button>
                                                </div>
                                            </div>
                                            <div className="add-to-cart">
                                                <button className="add-to-cart-btn"
                                                        onClick={() => goToDetails(product.id)}>
                                                    <i className="fa fa-shopping-cart"></i>
                                                    add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                                {noProductsFound(products.length === 0)}
                            </div>
                            <div className="store-filter clearfix">
                                <span className="store-qty">Showing 20-100 products</span>
                                <ul className="store-pagination">
                                    <li className="active">1</li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreComponent;