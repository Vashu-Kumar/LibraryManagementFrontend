import React from "react";
import { blogs } from "../assets/data";

const Blog = () => {
  return (
    <div className="max-padd-container py-16 pt-20">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Central Library Updates</h2>
        <p className="text-gray-400 mt-3">
          Stay informed with the latest news, book collections, and library activities.
        </p>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12 pt-6">
        {blogs.map((blog) => {
          return (
            <div key={blog.title} className="relative bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition">
              
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-lg mb-3 h-40 w-full object-cover"
              />

              <p className="text-sm text-blue-400 mb-1">{blog.category}</p>

              <h5 className="text-lg font-semibold mb-2 line-clamp-1">
                {blog.title}
              </h5>

              <p className="text-gray-300 text-sm line-clamp-3">
                Explore the latest updates from Central Library including new arrivals, 
                reading programs, and important announcements for members.
              </p>

              <button className="underline mt-3 text-blue-400 hover:text-blue-300 text-sm">
                Continue Reading →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;