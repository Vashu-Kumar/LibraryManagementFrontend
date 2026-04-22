import React, { useEffect, useState } from 'react';
import Item from "./Item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Title from "./Title"; // assuming you have a Title component
import { dummyBooks } from "../assets/data";


const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // Take first 6 books (or however many you want)
    setNewArrivals(dummyBooks.slice(0, 6));
  }, []);

  return (
    <section className="max-padd-container py-16">
      <Title
        title={"New"}
        title2={"Arrivals"}
        titleStyles={"pb-6"}
        para={
          "Check out our newest books arriving weekly with fresh ideas, exciting plots, and vibrant voices."
        }
      />

      {/* SWIPER CONTAINER */}
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
            355: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            900: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30,
            }
        }}
        modules={[Autoplay]}
        loop={true}
        className="min-h-[300px]"
      >
        {newArrivals.map((book) => (
          <SwiperSlide key={book._id || book.id}>
            <Item book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
