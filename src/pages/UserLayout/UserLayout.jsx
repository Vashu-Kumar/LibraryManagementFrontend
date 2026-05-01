import React, { useState } from 'react'
import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router-dom";
import UserSidebar from './UserSidebar.jsx';
import Navbar from './Navbar.jsx';                          

const drawerWidth = 240;                               

const UserLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false); 

    const handleDrawerToggle = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>  

            {/* app bar */}
            <Navbar handleDrawerToggle={handleDrawerToggle} />   

            {/* user sidebar */}
            <UserSidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            {/* main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${drawerWidth}px)` },   
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                <Box sx={{ p: 3 }}>       
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default UserLayout