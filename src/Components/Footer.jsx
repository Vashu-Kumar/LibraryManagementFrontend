import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Footer = () => {

  const linkSections = [
    {
      "title": "Quick Links",
      "links": ["Home", "Contact Us", "FAQs"],
    },
    {
      "title": "Follow Us",
      "links": ["Instagram", "Faceook", "Twitter"]
    }
  ];



  return (
    // <footer className="bg-gradient-to-l from-primary via-white to-primary py-4 border-t border-gray-300">
    //   <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-4">

    //     {/* Logo */}
    //     <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-800">
    //       <img src={"/library-logo.png"} alt="Central Library Logo" className="h-8" />
    //       <span>Central Library</span>
    //     </Link>

    //     {/* Copyright */}
    //     <p className="text-sm font-medium text-gray-700 text-center">
    //       &copy; {new Date().getFullYear()} Central Library Management System. All rights reserved.
    //     </p>

    //   </div>
    // </footer>

    <footer className="m-4 mt-6 bg-gradient-to-l from-primary via-white to-primary">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-50">
        <div>
          {/* LOGO */}
          <div className="flex flex-1">
            <Link to={"/"} className="bold-22 xl:bold-28 flex items-end gap-1">
              <img src="library-logo.png" alt="" className="h-9" />
              <div className="relative">
                CentralLibrary
              </div>
            </Link>
          </div>
          <p className="mt-6 font-bold text-lg">
            CentralLibrary is your digital gateway to explore, manage, and borrow books with ease.
            Designed to simplify library operations, our platform helps students and readers
            discover knowledge anytime, anywhere.
          </p>
        </div>

        <div className="flex flex-wrap justify-around mt-4 w-full md:w-[45%]">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base md:mb-5">
                {section.title}
              </h3>
              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center">
        Copyright 2026 CentralLibrary All Right Reserved.
      </p>
    </footer>

  );
};

export default Footer;