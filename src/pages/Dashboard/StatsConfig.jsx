import React from 'react'
import { LibraryBooks } from '@mui/icons-material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const StatsConfig = ({ myLoans, reservations, stats }) => [
    {
        id: "loans",
        title: "My Loans",
        subTitle: "Books you're reading",
        value: myLoans.length,
        icon: <LibraryBooks sx={{fontSize: 32, color: "#0a047a"}} />,
        // bgColor: "bg-blue-100",
         bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-400",
        textColor: "text-blue-900"
    },
    {
        id: "reservations",
        title: "Reservations",
        subTitle: "Books on hold",
        value: reservations.length || 0,
        icon: <EventAvailableIcon sx={{fontSize: 32, color: "##10B981"}} />,
        // bgColor: "bg-green-100",
        bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-400",
        textColor: "text-green-600"
    },
    {
        id: "read",
        title: "Books Read",
        subTitle: "Books you've completed",
        value: myLoans.length || 0,
        icon: <HistoryIcon sx={{fontSize: 32, color: "#290050"}} />,
        // bgColor: "bg-purple-100",
        bgColor: "bg-gradient-to-br from-purple-600 to-purple-400",
        textColor: "text-purple-600"
    },
    {
        id: "streak",
        title: "Day Streak",
        subTitle: "Keep it going",
        value: stats.readingStreak,
        icon: <TrendingUpIcon sx={{fontSize: 32, color: "#ad7006"}} />,
        // bgColor: "bg-orange-100",
         bgColor: "bg-gradient-to-br from-amber-400 to-yellow-300",
        textColor: "text-orange-600"
    },
    
]
