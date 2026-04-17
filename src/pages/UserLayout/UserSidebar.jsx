import React from 'react'
import { Box } from '@mui/material'
import Drawer from '@mui/material/Drawer';
import SidebarDrawer from './SidebarDrawer';

const drawerWidth = 240;                               // fix: number, not '240px'

const UserSidebar = ({ mobileOpen, handleDrawerToggle }) => {   // fix: accept props
    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
            {/* Mobile drawer — fix: was missing entirely */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}     // better mobile performance
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        border: 'none',
                    },
                }}
            >
                <SidebarDrawer />
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        border: 'none',
                    },
                }}
                open
            >
                <SidebarDrawer />
            </Drawer>
        </Box>
    )
}

export default UserSidebar