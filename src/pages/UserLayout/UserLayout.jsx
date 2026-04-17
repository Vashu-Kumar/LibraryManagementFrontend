import React, { useState } from 'react'
import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router-dom";
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';                          // fix: was missing

const drawerWidth = 240;                               // fix: number, not '240px' string

const UserLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false); // fix: was missing

    const handleDrawerToggle = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>  {/* fix: theme-aware bg */}

            {/* app bar */}
            <Navbar handleDrawerToggle={handleDrawerToggle} />   {/* fix: was missing */}

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
                    width: { md: `calc(100% - ${drawerWidth}px)` },   // fix: no double 'px'
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                <Box sx={{ p: 3 }}>        {/* fix: added padding so content isn't flush */}
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default UserLayout