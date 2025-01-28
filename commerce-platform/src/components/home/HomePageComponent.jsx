import React, {useEffect, useRef, useState} from 'react';
import "../../assets/css/homepage.scss"
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HomePageComponent() {
    const swiperRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false)

    function handleScroll() {
        setIsScrolled(window.scrollY > 100)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);
    return (
        <>
            <div className="homepage-background">
                {/* Homepage Navbar */}
                <div className="homepage-navbar-container">
                    <nav className={`homepage-navbar navbar navbar-expand-lg navbar-light bg-white fixed-top shadow ${isScrolled? 'scrolled' : ''}`}>
                        <div className="container-fluid">
                            {/*Brand*/}
                            <a href="">
                                <img src="/logos/swain_logo_black.png" className="logo" alt="swain_logo"/>
                            </a>
                            {/*Toggler for small screens */}
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* Navbar Links */}
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href={"/home"}>Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href={"/store"}>Shop</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* News' Slider */}
                <div className="container w-75 mt-5">
                    <Swiper
                        className="homepage-swiper"
                        modules={[Autoplay, Navigation, Pagination]}
                        loop={true}
                        autoplay={{delay: 3000}}
                        pagination={{clickable: true}}
                        speed={2000}
                        direction="horizontal"
                        spaceBetween={"100px"}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper // Instantiate swiper reference.
                        }}
                        onMouseEnter={() => swiperRef.current.autoplay.stop()} // Stop slider autoplay when mouse enter.
                        onMouseLeave={() => swiperRef.current.autoplay.start()} // Resume autoplay when mouse leave.
                        breakpoints={{
                            768: {
                                direction: "horizontal",
                                slidesPerView: 1
                            },
                            0: {
                                direction: "vertical",
                                slidesPerView: 1
                            },
                        }}
                        style={{width: "100%", maxHeight: "1000px"}}
                    >
                        <SwiperSlide>
                            <div className="row news-container">
                                <div className="col-xl-6">
                                    <div className="container">
                                        <div className="title">
                                            <span>IPhone New Collection!</span>
                                        </div>
                                        <div className="content mt-4">
                                            <p>
                                                The latest iPhone is here, and it&apos;s packed with features that will
                                                make you
                                                love your phone even more.
                                                With a stunning new design, powerful A-series chip, and advanced camera
                                                system,
                                                the latest iPhone is the perfect phone for anyone who wants the best.
                                            </p>
                                        </div>
                                        <button className="btn">Discover Now</button>
                                    </div>
                                </div>
                                <div className="col-xl-6 product-image">
                                    <img alt='product-img' src={'/img/iphones.png'}/>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="row news-container">
                                <div className="col-xl-6">
                                    <div className="container">
                                        <div className="title">
                                            <span>Beats: Elevate Your Sound</span>
                                        </div>
                                        <div className="content mt-4">
                                            <p>
                                                The latest Beats headphones are here.
                                                With a stunning new design that&apos;s as sleek as your style,
                                                powerful sound that will make your music come alive,
                                                and advanced noise-canceling technology that lets you escape into your own world.
                                            </p>
                                        </div>
                                        <button className="btn">Discover Now</button>
                                    </div>
                                </div>
                                <div className="col-xl-6 product-image">
                                    <img alt='product-img' src={'/img/beats-headphones.png'}/>
                                </div>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="row news-container">
                                <div className="col-xl-6">
                                    <div className="container">
                                        <div className="title">
                                            <span>Samsung Crystal UHD Series</span>
                                        </div>
                                        <div className="content mt-4">
                                            <p>
                                                For a limited time, enjoy a hot deal on this incredible TV.
                                                Don&apos;t miss out on this opportunity to upgrade your home entertainment experience
                                                at an unbeatable price.
                                            </p>
                                        </div>
                                        <button className="btn">Discover Now</button>
                                    </div>
                                </div>
                                <div className="col-xl-6 product-image">
                                    <img alt='product-img' src={'/img/samsung_tv.png'}/>
                                </div>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                {/* Div */}
                <div style={{backgroundColor: "#c5c5c5", height: '1250px'}}>

                </div>
            </div>
        </>
    );
}

export default HomePageComponent;