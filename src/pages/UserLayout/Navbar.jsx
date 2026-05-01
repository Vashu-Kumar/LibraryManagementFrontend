import React from 'react'
import AppBar from '@mui/material/AppBar';
import { navigationItems } from './NavigationItems.jsx';
import {
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ContrastIcon from '@mui/icons-material/Contrast';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import { isActive } from './util.js';

const drawerWidth = 260;


// CHANGE WITH REAL USER FROM DATABASE
const user = {
    fullName: "John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg"
}


const Navbar = ({ handleDrawerToggle }) => {
    const location = useLocation();

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                bgcolor: "background.paper",
                color: "text.primary",            
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    noWrap                         
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 600 }}
                >
                    {navigationItems.find((item) => isActive(item.path, location))?.title || "Dashboard"}
                </Typography>

                <Tooltip title="Search">
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                </Tooltip>

                {/* fix: wrapped ContrastIcon in Tooltip + IconButton */}
                <Tooltip title="Toggle contrast">
                    <IconButton color="inherit">
                        <ContrastIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Profile">
                    <IconButton sx={{ ml: 1 }}>
                        <Avatar
                            src={user?.profilePicture}
                            sx={{ width: 36, height: 36 }}
                        >
                            {user?.fullName?.charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;