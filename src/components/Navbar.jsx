import React from 'react';
import { TbHome } from "react-icons/tb";
import { IoLibraryOutline } from "react-icons/io5";
import { TbBrandBlogger } from "react-icons/tb";
import { PiEnvelopeDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ containerStyles, setMenuOpened }) => {

  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
    if (setMenuOpened) setMenuOpened(false);
  };

  return (
    <nav className={containerStyles}>

      {/* 🏠 Home */}
      <NavLink
        to="/"
        onClick={handleClick}
        className={({ isActive }) =>
          `${isActive ? "bg-white ring-1 ring-slate-50" : ""} flexCenter gap-x-2 px-3 py-1.5 rounded-full`
        }
      >
        <TbHome className="text-xl" />
        <span className="medium-16">Home</span>
      </NavLink>

      {/* 📚 Shop */}
      <NavLink
        to="/borrowBooks"
        onClick={handleClick}
        className={({ isActive }) =>
          `${isActive ? "bg-white ring-1 ring-slate-50" : ""} flexCenter gap-x-2 px-3 py-1.5 rounded-full`
        }
      >
        <IoLibraryOutline className="text-xl" />
        <span className="medium-16">Borrow Books</span>
      </NavLink>

      {/* 📝 Blog */}
      {/* <NavLink
        to="/blog"
        onClick={handleClick}
        className={({ isActive }) =>
          `${isActive ? "bg-white ring-1 ring-slate-50" : ""} flexCenter gap-x-2 px-3 py-1.5 rounded-full`
        }
      >
        <TbBrandBlogger className="text-xl" />
        <span className="medium-16">Blog</span>
      </NavLink> */}

      {/* 📧 Contact (external) */}
      <a
        href="mailto:CentralLibrary101@gmail.com"
        onClick={handleClick}
        className="flexCenter gap-x-2 px-3 py-1.5 rounded-full"
      >
        <PiEnvelopeDuotone className="text-xl" />
        <span className="medium-16">Contact</span>
      </a>

      {/* 🔐 Dashboard (only if logged in) */}
      {isAuthenticated && (
        <NavLink
          to="/user/dashboard"
          onClick={handleClick}
          className={({ isActive }) =>
            `${isActive ? "bg-white ring-1 ring-slate-50" : ""} flexCenter gap-x-2 px-3 py-1.5 rounded-full`
          }
        >
          <span className="medium-16">Dashboard</span>
        </NavLink>
      )}

      {/* 🔑 Auth Button */}
      {/* {isAuthenticated ? (
        <button
          onClick={() => {
            logout();
            handleClick();
          }}
          className="px-3 py-1.5 rounded-full bg-red-500 text-white"
        >
          Logout
        </button>
      ) : (
        <NavLink
          to="/login"
          onClick={handleClick}
          className="px-3 py-1.5 rounded-full bg-green-500 text-white"
        >
          Login
        </NavLink>
      )} */}

    </nav>
  );
};

export default Navbar;