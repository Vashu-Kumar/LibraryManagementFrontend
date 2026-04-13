import React from 'react'
import { AccessTime } from '@mui/icons-material'
import GetStatusChip from './GetStatusChip'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';


const CurrentLoanCard = ({ loan }) => {
    return (
        <div className="flex items-centerjustify-between p-6 border border-gray-300 rounded-2xl">

            <div className="flex items- space-x-4 flex-1">
                <div className="">
                    <img src={loan.bookCoverImage} alt={loan.bookTitle} className="w-16 h-24 object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{loan.bookTitle}</h4>
                    <p className="text-gray-600 p-2 m-2">by {loan.bookAuthor}</p>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-sm">
                            <AccessTime sx={{ fontSize: '1rem' }} />
                            <span>Due: {new Date(loan.dueDate).toLocaleDateString()}</span>
                        </div>
                        <GetStatusChip status={loan.status} />
                        <Chip label={`${loan.remainingDays > 0 ? loan.remainingDays : loan.overdueDays} days ${loan.remainingDays >= 0 ? 'remaining' : 'overdue'}`} variant="outlined" size="small" />
                    </div>
                </div>
            </div>
            <div>
                <Button variant="outlined">View</Button>
            </div>
        </div>
    )
}

export default CurrentLoanCard
