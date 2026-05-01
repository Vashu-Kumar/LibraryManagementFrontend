import React from 'react'
import CurrentLoanCard from './CurrentLoanCard.jsx'

const CurrentLoan = ({ loans }) => {

const loan ={
    title: "The Great Gatsby",
    bookCoverImage: "https://plus.unsplash.com/premium_photo-1725408045441-caab8be43801?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8fDA%3D",
    bookAuthor: "DarkLord",
    dueDate: "2026-05-15",
    status: "ACTIVATE",
    remainingDays: 10,
    overdueDays: 0,
}

    return (
        <div className='p-6'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                Books you're currently reading
            </h3>

            <div className="space-y-4">
                {[1, 1, 1, 1].map((item, index) => 
                    <CurrentLoanCard loan={loan} key={index} />
                )}
            </div>

        </div>
    )
}

export default CurrentLoan

