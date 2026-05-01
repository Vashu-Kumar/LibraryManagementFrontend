// import React from 'react'
// import { TbHome } from "react-icons/tb";
// import { IoLibraryOutline } from "react-icons/io5";
// import { TbBrandBlogger } from "react-icons/tb";
// import { PiEnvelopeDuotone } from "react-icons/pi";
// import { NavLink } from "react-router-dom";

// const Navbar = ({containerStyles, setMenuOpened}) => {
// const navItems = [
//     { to: '/', label:"Home", icon:<TbHome />},
//     { to: '/shop', label:"Shop", icon:<IoLibraryOutline />},
//     { to: '/blog', label:"Blog", icon:<TbBrandBlogger />},
//     { to: "mailTo:CentralLibrary101@gmail.com", label:"Contact", icon:<PiEnvelopeDuotone />}
// ]

//   return (
//     <nav className={containerStyles}> 
//       {navItems.map(({to,label,icon})=> (
//         <div onClick={()=> setMenuOpened(false)} key={label}>
//             <NavLink to ={to} className={({isActive}) => `${isActive ? "bg-white ring-1 ring-slate-50 ":"" } flexCenter gap-x-2 px-3 py-1.5 rounded-full`}>
//                 <span className='text-xl'>{icon}</span>
//                 <span className='medium-16'>{label}</span>

//             </NavLink>
//         </div>
//       ))}
//     </nav>
//   )
// }

// export default Navbar



import React from 'react';
import { TbHome } from "react-icons/tb";
import { IoLibraryOutline } from "react-icons/io5";
import { TbBrandBlogger } from "react-icons/tb";
import { PiEnvelopeDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        to="/shop"
        onClick={handleClick}
        className={({ isActive }) =>
          `${isActive ? "bg-white ring-1 ring-slate-50" : ""} flexCenter gap-x-2 px-3 py-1.5 rounded-full`
        }
      >
        <IoLibraryOutline className="text-xl" />
        <span className="medium-16">Shop</span>
      </NavLink>

      {/* 📝 Blog */}
      <NavLink
        to="/blog"
        onClick={handleClick}
        className={({ isActive }) =>
          `${isActive ? "bg-white ring-1 ring-slate-50" : ""} flexCenter gap-x-2 px-3 py-1.5 rounded-full`
        }
      >
        <TbBrandBlogger className="text-xl" />
        <span className="medium-16">Blog</span>
      </NavLink>

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
      {isAuthenticated ? (
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
      )}

    </nav>
  );
};

export default Navbar;