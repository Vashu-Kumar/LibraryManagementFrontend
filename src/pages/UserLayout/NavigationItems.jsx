import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export const secondaryItems = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <PersonIcon />           // fix: was '<PersonalIcon />' (string + wrong name)
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />         // fix: was '<SettingsIcon />' (string)
    }
];

export const navigationItems = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <DashboardIcon />,       // fix: was '<DashboardIcon />' (string)
        description: 'Overview & Stats'
    },
    {
        title: 'Browse Books',
        path: '/books',
        icon: <MenuBookIcon />,
        description: 'Explore Library'
    },
    {
        title: 'My Loans',
        path: '/my-loans',
        icon: <EventNoteIcon />,
        description: 'Active & History',
        badge: 'loans'
    },
    {
        title: 'My Reservations',
        path: '/my-reservations',
        icon: <EventNoteIcon />,
        description: 'Active & History',
        badge: 'reservations'
    },
    {
        title: 'My Fines',
        path: '/my-fines',
        icon: <ReceiptIcon />,
        description: 'Pending & Paid',
        badge: 'fines'
    },
    {
        title: 'Subscriptions',
        path: '/subscriptions',
        icon: <CardMembershipIcon />,
        description: 'Manage Plans',
        badge: 'subscription'
    },
    {
        title: 'Wishlist',
        path: '/wishlist',
        icon: <FavoriteIcon />,
        description: 'Saved Books'
    }
];