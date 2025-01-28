import React from "react";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SliderComponent() {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Autoplay]}
            speed={2500}
            loop={true}
            autoplay={{delay: 2000}}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
        >
            <SwiperSlide><div style={{height:"300px", backgroundColor:"black"}}/> </SwiperSlide>
            <SwiperSlide><div style={{height:"300px", backgroundColor:"red"}}/> </SwiperSlide>
            <SwiperSlide><div style={{height:"300px", backgroundColor:"blue"}}/> </SwiperSlide>
            <SwiperSlide><div style={{height:"300px", backgroundColor:"yellow"}}/> </SwiperSlide>

        </Swiper>
    );
}

export default SliderComponent;