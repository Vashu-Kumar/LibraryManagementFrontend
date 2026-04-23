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
import ShopContext from "../context/ShopContext";

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
    <section className="max-padd-container flex gap-6 h-[620px] mt-22">
      <div className="flex-[5]  bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${bg})` }}>
        {/* LEFT SIDE */}

        <div className="max-padd-container flex flex-col h-full justify-center pt-8">
          <h1 className="bold-24 text-secondary font-thin">Welcome to Central Library</h1>
          <h3 className="h1 max-w-[760px] !font-[600] leading-none">Discover Knowledge, One Book at a Time</h3>
          <p className="max-w-xl pt-5">Explore our collection of books, manage your borrowings,
            and access a seamless library experience with our
            Library Management System.</p>

          <div className="flex mt-4">
            <Link to={'/shop'} className="bg-white text-xs font-medium pl-6 rounded-full flexCenter gap-x-6 group "> Check our latest collection
              <FaArrowRight className="bg-secondary text-white rounded-full h-8 w-8 m-[3px] border border white group-hover:bg-primary group-hover:text-black transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block flex-[2] bg-primary rounded-2xl bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgHero})` }}>
        <div className="max-w-sm pt-26 ">
          <div>
            <Swiper
              modules={[Autoplay]}
              className="min-h-[420px] max-w-64"
              autoplay={{
                delay: 1800,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={800}
              slidesPerView={1}
              spaceBetween={20}
              className="h-[380px] w-[260px]"
            >
              {popularBooks.map((book) => (
                <SwiperSlide key={book._id || book.id}>
                  <Item book={book} fromHero={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Hero;