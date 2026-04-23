import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FaBars, FaSearch } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";

import Navbar from './Navbar'
import userImg from '../assets/user.png'

const Header = () => {

  const [menuOpened, setMenuOpened] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [user, setUser] = useState(true)

  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpened(prev => !prev)

  const logoutUser = () => {
    setUser(false)
    navigate("/login")
  }

  return (
    <header className='absolute top-0 left-0 right-0 max-padd-container flexBetween gap-4 py-2'>

      {/* LOGO */}
      <div className="flex flex-1">
        <Link to={"/"} className='bold-22 xl:bold-28 flex items-end gap-1'>
          <img src="library-logo.png" alt="" className='hidden sm:block h-12 w-12' />
          <div className="relative top-1">
            <span className='text-secondary'>CentralLibrary</span>
          </div>
        </Link>
      </div>

      {/* NAVBAR */}
      <div className="flex-1">
        <Navbar
          setMenuOpened={setMenuOpened}
          containerStyles={`${menuOpened
            ? 'flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-100 z-9'
            : 'hidden lg:flex gap-x-5 xl:gap-x-7 medium-15 ring-1 ring-slate-50 p-1 bg-primary rounded-full'}`}
        />
      </div>

      {/* SEARCH + MENU */}
      <div className='flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-8'>

        <div className='relative hidden xl:flex items-center'>
          <div className={`bg-white ring-1 ring-slate-100 rounded-full overflow-hidden transition-all duration-300 ease-in-out ${showSearch ? "w-[260px] opacity-100 px-4 py-2" : "w-0 opacity-0 p-0"}`}>
            <input
              type="text"
              placeholder='search book'
              className="bg-transparent w-full text-sm outline-none pr-10 placeholder:text-gray-400"
            />
          </div>

          <div
            onClick={() => setShowSearch(prev => !prev)}
            className="absolute right-0 bg-primary p-2 rounded-full cursor-pointer z-10"
          >
            <FaSearch className='text-xl' />
          </div>

          {menuOpened ? (
            <FaBarsStaggered onClick={toggleMenu} className='lg:hidden cursor-pointer text-xl' />
          ) : (
            <FaBars onClick={toggleMenu} className='lg:hidden cursor-pointer text-xl' />
          )}
        </div>

        {/* USER */}
        <div className="group relative">
          <div>
            {user ? (
              <div className='flex gap-2 items-center cursor-pointer rounded-full bg-white'>
                <img src={userImg} alt="User Image" height={44} width={44} />
              </div>
            ) : (
              <button className="btn-light flexCenter gap-x-2">
                Login <RiUserLine className='text-xl' />
              </button>
            )}
          </div>

          {user && (
            <ul className="bg-white p-2 ring-1 ring-slate-100 rounded absolute right-0 top-10 hidden group-hover:flex flex-col medium-14 shadow-md z-10">
              <li
                onClick={logoutUser}
                className='p-2 rounded-md hover:bg-primary cursor-pointer'
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>

    </header>
  )
}

export default Header