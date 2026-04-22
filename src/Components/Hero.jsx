import React, { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import bgHero from "../assets/bg-hero.png";
import Item from "./Item";

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
    <div>
      <section className="max-padd-container flex gap-6 h-[520px] mt-22">
        
        {/* LEFT SIDE */}
        <div
          className="flex flex-[5] bg-cover bg-center bg-no-repeat rounded-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="flex flex-col h-full justify-center pt-8 px-6 lg:px-12">
            
            <h3 className="bold-24 text-secondary font-thin">
              Welcome to Central Library
            </h3>

            <h1 className="h1 max-w-[760px] !font-[600]">
              Discover Knowledge, One Book at a Time
            </h1>

            <p className="max-w-l pt-5 text-gray-300">
              Explore our collection of books, manage your borrowings,
              and access a seamless library experience with our
              Library Management System.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="hidden lg:block flex-[2] bg-primary rounded-2xl bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${bgHero})`,
            imageRendering: "crisp-edges",
          }}
        >
          <div className="max-w-sm pt-28 flex justify-center">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 1800,
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
    </div>
  );
};

export default Hero;