import React, { useContext, useEffect, useState } from "react";
import bg from "../assets/bg.png";
import bgHero from "../assets/bg-hero.png";
import Item from "./Item";
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
      <div className="flex-[5]  bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${bg})` }}>
        {/* LEFT SIDE */}

        <div className="flex flex-col h-full justify-center pt-8">
          <h1 className="bold-24 text-secondary font-thin">Welcome to Central Library</h1>
          <h3 className="h1 max-w-[664px] !font-[600] leading-none">Discover Knowledge, One Book at a Time</h3>
          <p className="max-w-xl pt-5">Explore our collection of books, manage your borrowings,
            and access a seamless library experience with our
            Library Management System.</p>
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
        <div className="max-w-sm">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            slidesPerView={1}
            spaceBetween={20}
            className="h-[300px] w-[200px]"
          >
            {popularBooks.map((book) => (
              <SwiperSlide key={book._id || book.id}>
                <Item book={book} fromHero={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  );
};

export default Hero;