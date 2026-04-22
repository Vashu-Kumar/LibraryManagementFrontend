import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../assets/data";
import Title from "../components/Title"; 

const Categories = () => {
  const navigate = useNavigate();
  const colors = ["bg-[#aeda06]", "bg-[#ff6c9]", "bg-[#fddbdb]"];

  return (
    <section className="max-padd-container pt-16">
      <Title
        title1="Category"
        title2="List"
        titleStyles="pb-6"
        paraStyles="hidden"
      />

      {/* CONTAINER */}
      <div className="flex gap-9 flex-wrap justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(`/shop/${category.name.toLowerCase()}`)}
            className="flexCenter flex-col cursor-pointer group hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className={`flexCenter flex-col h-36 w-36 sm:h-28 sm:w-28 rounded-2xl ${
                colors[index % 3]
              } group-hover:scale-105 transition-transform duration-300`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="object-cover"
                height={40}
                width={40}
              />
              <h5 className="h5 capitalize mt-6">{category.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
