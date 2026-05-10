import React, { useContext, useEffect, useState } from "react";
import bg from "../assets/bg.png";
import bgHero from "../assets/bg-hero.png";
import Item from "./Item.jsx";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Import dummy data
import { dummyBooks as books } from "../assets/data";

const Hero = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    // Filter featured/popular books
    const popular = books.filter((book) => book.popular).slice(0, 6);
    setPopularBooks(popular);
  }, []);

  return (
    <section className="flex gap-6 h-[620px] mt-22">
      <div className="flex-[5]  bg-cover bg-center bg-no-repeat rounded-2xl" >
        {/* LEFT SIDE */}

        <div className="flex flex-col ml-32 h-full justify-center">
          <h1 className="bold-24 inline-flex items-center font-thin pb-32 text-[#3c28ec]">Welcome to Central Library</h1>
          <h3 className="h1 max-w-[664px] !font-[600] text-[#111827]  leading-none">Your Gateway to </h3>
          <h3 className="h1 max-w-[664px] !font-[600] bg-gradient-to-r from-[#5B3DF5] to-[#3aa5ed] bg-clip-text text-transparent leading-none">Endless Knowledge </h3>
          <p className="max-w-xl pt-5">Discover, reserve, and enjoy thousands of books from our extensive collection. Join our comunity of readers and experience seamless library management.</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="hidden lg:flex flex-[2] bg-primary justify-center items-center rounded-2xl 
bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(${bgHero})`,
          imageRendering: "crisp-edges",
        }}
      >
        <div>
          {
            <Swiper
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,

              }}
              breakpoints={{
                355: {
                  slidesPerView: 1,
                  spaceBetween: 10
                },
              }}
              modules={[ Autoplay ]}
              className="mih-h-[400px] max-w-64"
              loop={true}
              speed={800}
            >
              {popularBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <Item book={book} fromHero={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          }
        </div>
      </div>
    </section>
  );
};

export default Hero;