import React from 'react'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { getStatusColor } from './getStatusColor.jsx';
import BookIcon from '@mui/icons-material/Book';
import { Divider } from '@mui/material';



const MyReservationCard = ({ reservation }) => {

    const statusColors = getStatusColor(reservation.status);
    // const timeRemaining = getTimeRemaining(reservation.expiresAt);

    const getStatusIcon = (status) => {
        const iconClass = "w-5 h-5"
        const icons = {
            PENDING: <HourglassBottomIcon className={iconClass} />,
            AVAILABLE: <CalendarTodayIcon className={iconClass} />,
            FULFILLED: <CheckCircleIcon  className={iconClass} />,
            CANCELLED: <CloseIcon className={iconClass} />,
            EXPIRED: <AccessAlarmIcon className={iconClass} />
        };
        return icons[status] || <AccessAlarmIcon className={iconClass} />;
    }

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1 overflow-hidden border-gray-100" >

            {/* Status banner*/}
            <div className={`bg-gradient-to-r ${statusColors.gradient} px-4 py-3 flex items-center justify-between`}>

                <div className="flex items-center gap-2">
                    <span>
                        {getStatusIcon(reservation.status)}
                    </span>
                    <span className={`${statusColors.text} font-bold text-sm uppercase tracking-wider`}>
                        {reservation.status}
                    </span>
                </div>
            </div>

            <div className="p-6 ">
                {/* Book header */}
                <div className="mb-4">
                    <div className="flex items center gap-3 mb-2">

                        <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                            <BookIcon className="w-6 h-6 text-white" />
                        </div>

                        <div>
                            <p >Book Id</p>
                            <h3>#{reservation.bookId}</h3>
                        </div>
                    </div>

                    <p>{reservation.bookTitle}</p>
                </div>
                <Divider />

                {/* Timeline */}
                <div className="space-y-3 mt-3">
                    <div className="flex items-start gap-2">
                        <AccessAlarmIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Reserved
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                {reservation.reservedAt}
                            </p>
                        </div>
                    </div>
                    {reservation.availableAt && (<div className="flex flex-start gap-2">
                        <CalendarTodayIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Available
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                {reservation.availableAt}
                            </p>
                        </div>
                    </div>
                    )}


                    {/* CURRENTLY WE DON'T HAVE EXPIRY DATE */}
                    {/* {reservation.expiresAt && (<div className="flex flex-start gap-2">
                        <NotificationIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Expires
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                {reservation.expiresAt}
                            </p>
                        </div>
                    </div>
                    )} */}


                    {reservation.fulfilledAt && (<div className="flex flex-start gap-2">
                        <CheckCircleIcon  className="w-4 h-4 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-blue-500 uppercase">
                                Fulfilled
                            </p>
                            <p className="text-sm font-semibold text-blue-700">
                                {reservation.expiresAt}
                            </p>
                        </div>
                    </div>
                    )}





                </div>















































            </div>
        </div>
    )
}
export default MyReservationCard
