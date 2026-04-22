import React, { useLayoutEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [navMenuAnchor, setNavMenuAnchor] = React.useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);

  const navItems = useRef([]);
  const userMenuItems = useRef([]);

  const handleOpenNavMenu = (event) => setNavMenuAnchor(event.currentTarget);
  const handleCloseNavMenu = () => setNavMenuAnchor(null);
  const handleOpenUserMenu = (event) => setUserMenuAnchor(event.currentTarget);
  const handleCloseUserMenu = () => setUserMenuAnchor(null);

  // 🌀 Animate nav links
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navItems.current, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  // 🌀 Animate user dropdown
  useLayoutEffect(() => {
    if (!userMenuAnchor) return;
    const id = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from(userMenuItems.current, {
          opacity: 0,
          x: 30,
          stagger: 0.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      return () => ctx.revert();
    }, 50);
    return () => clearTimeout(id);
  }, [userMenuAnchor]);

  // 🌍 Pages
  const pages = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/CentralLibrary/blog" },
    { label: "Contact", path: "/CentralLibrary/contact" },
    { label: "About", path: "/CentralLibrary/about" },
  ];

  const settings = ["Profile", "Account", "Logout"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1B1212",
        color: "#fefefe",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar className="flex justify-between items-center">

        {/* 🏷️ Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline text-white">
          <img
            src="/library-logo.png"
            alt="Central Library Logo"
            className="h-10 w-10 rounded-full"
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Central Library
          </Typography>
        </Link>

        {/* 🌐 MOBILE MENU */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={navMenuAnchor}
            open={Boolean(navMenuAnchor)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.path}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
              >
                {page.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* 🖥️ DESKTOP NAV */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} className="justify-center">
          <div className="bg-white rounded-full shadow-md ring-1 ring-slate-900/5 px-6 py-2 flex gap-x-6 items-center">
            {pages.map((page, index) => (
              <Link
                key={page.path}
                to={page.path}
                ref={(el) => (navItems.current[index] = el)}
                className="text-gray-800 hover:text-yellow-500 font-medium text-[15px] transition-colors duration-200"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </Box>

        {/* 👤 User Avatar */}
        {user && (
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name || "User"} src="/library-logo.png" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={setting}
                  ref={(el) => (userMenuItems.current[index] = el)}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Profile") navigate("/CentralLibrary/profile");
                    else if (setting === "Logout") handleLogout();
                    else if (setting === "Account")
                      alert("Account settings coming soon!");
                  }}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;