import React from 'react'
import Avatar from '@mui/material/Avatar';
import MenuBook from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { navigationItems, secondaryItems } from './NavigationItems.jsx';
import Divider from '@mui/material/Divider';
import { useLocation, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';  
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';

import LogoutIcon from '@mui/icons-material/Logout';
import { isActive } from './util.js';
import ListItem from '@mui/material/ListItem';

const activeButtonSx = {
    borderRadius: 1.5,
    py: 1.5,
    px: 2,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
};

const getNavButtonSx = (active) => ({
    ...activeButtonSx,
    background: active                                          
        ? 'linear-gradient(90deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 100%)'
        : 'transparent',
    border: active
        ? '1px solid rgba(99,102,241,0.3)'
        : '1px solid transparent',
    backdropFilter: active ? 'blur(10px)' : 'none',
    '&:hover': {
        background: active
            ? alpha('#6366f1', 0.3)
            : 'rgba(255,255,255,0.1)',                         
        transform: 'translateX(6px)',                           
        border: '1px solid rgba(99,102,241,0.5)',
    },
    '&::before': active ? {                                   
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',                                             
        transform: 'translateY(-50%)',
        width: 4,
        height: '60%',
        borderRadius: '0 4px 4px 0',
        bgcolor: '#6366f1',
        boxShadow: '0 0 12px rgba(102,126,234,0.6)',
    } : {},
});

const gradientTextSx = {
    background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
    WebkitBackgroundClip: 'text',                              
    WebkitTextFillColor: 'transparent',
};

const UserSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleChangePath = (path) => navigate(path);

    const handleLogout = () => {
        console.log("logout");
    };

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '300px',
                background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 80%)',
                pointerEvents: 'none',
            },
        }}>
            {/* Logo / brand */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
                <Avatar sx={{
                    width: 48, height: 48,
                    backgroundColor: 'rgba(99,102,241,0.15)',
                    fontWeight: 'bold', fontSize: 24,
                    boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
                }}>
                    <MenuBook />
                </Avatar>
                <Box>
                    <Typography sx={{ letterSpacing: 0.54, ...gradientTextSx }}>
                        Library
                    </Typography>
                    <Typography variant="caption" sx={{
                        opacity: 0.7, fontWeight: 500,
                        letterSpacing: 1, textTransform: 'uppercase',
                        ...gradientTextSx,
                    }}>
                        Books Hub
                    </Typography>
                </Box>
            </Box>

            <List sx={{ flexGrow: 1 }}>
                {/* Primary nav items */}
                {navigationItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Tooltip title={item.description} placement="right">
                            <ListItemButton
                                onClick={() => handleChangePath(item.path)}
                                sx={getNavButtonSx(isActive(item.path, location))}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 48,
                                    color: isActive(item.path, location) ? '#6366f1' : 'rgba(255,255,255,0.7)',
                                    transition: 'all 0.3s ease',
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <Typography variant="body2" sx={{ color: 'inherit' }}>
                                    {item.title}
                                </Typography>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2, my: 1 }} />

                {/* Secondary nav items */}
                {secondaryItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Tooltip title={item.description} placement="right">
                            <ListItemButton
                                onClick={() => handleChangePath(item.path)}
                                sx={getNavButtonSx(isActive(item.path, location))}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 48,
                                    color: isActive(item.path, location) ? '#6366f1' : 'rgba(255,255,255,0.7)',
                                    transition: 'all 0.3s ease',
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <Typography variant="body2" sx={{ color: 'inherit' }}>
                                    {item.title}
                                </Typography>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            {/* Logout + footer */}
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    onClick={handleLogout}                        
                    sx={{
                        borderRadius: 2.5, py: 1.5, px: 2,
                        background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.15) 100%)',
                        border: '1px solid rgba(239,68,68,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: 'linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(220,38,38,0.25) 100%)',
                            border: '1px solid rgba(239,68,68,0.6)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(239,68,68,0.15)',
                        },
                    }}>
                    <ListItemIcon sx={{ minWidth: 48, color: '#ef4444', transition: 'all 0.3s ease' }}>
                        <Logout />
                    </ListItemIcon>
                    <Typography variant="body2" sx={{ color: 'white' }}>Logout</Typography>
                </ListItemButton>

                
                <Typography variant="caption" sx={{ display: 'block', pt: 2, opacity: 0.4, textAlign: 'center' }}>
                    © 2026 Central Library. All rights reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default UserSidebar;