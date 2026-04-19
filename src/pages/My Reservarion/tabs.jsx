import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const tabs = [
    {label: "All Reservations", icon:<BookIcon className="w-5 h-5" />},
    {label: "Active", icon:<AccessAlarmIcon className="w-5 h-5" />},
    {label: "Completed", icon:<CheckCircleIcon className="w-5 h-5" />},
];