import React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { tabs } from './tabs'
import LoanCard from './LoanCard'

const loans = [
  {
    "id": 26,
    "bookTitle": "Mastering Spring Boot and Microservices",
    "bookAuthor": "Ashok Zarmariya",
    "bookIsbn": "978-1-4028-9462-6",
    "bookCoverImage": "http://example.com/book1.jpg",
    "userId": 7,
    "userName": "Ritika",
    "userEmail": "ritika@gmail.com",
    "checkoutDate": "2025-12-25",
    "dueDate": "2026-01-08",
    "returnDate": null,
    "status": "CHECKED_OUT",
    "type": "CHECKOUT",
    "isOverdue": false,
    "overdueDays": 0,
    "remainingDays": 11,
    "maxRenewals": 2,
    "renewalCount": 0,
    "fineAmount": null,
    "finePaid": null,
    "notes": "i want to learn microservices",
    "createdAt": "2025-12-25T18:58:46.900339",
    "updatedAt": "2025-12-25T18:58:46.900339"
  },
  {
    "id": 27,
    "bookTitle": "Clean Code",
    "bookAuthor": "Robert C. Martin",
    "bookIsbn": "978-0-13-235088-4",
    "bookCoverImage": "http://example.com/book2.jpg",
    "userId": 8,
    "userName": "Aman",
    "userEmail": "aman@gmail.com",
    "checkoutDate": "2025-12-20",
    "dueDate": "2026-01-05",
    "returnDate": null,
    "status": "CHECKED_OUT",
    "type": "CHECKOUT",
    "isOverdue": false,
    "overdueDays": 0,
    "remainingDays": 8,
    "maxRenewals": 2,
    "renewalCount": 1,
    "fineAmount": null,
    "finePaid": null,
    "notes": "improving coding skills",
    "createdAt": "2025-12-20T10:20:30.000000",
    "updatedAt": "2025-12-20T10:20:30.000000"
  },
  {
    "id": 28,
    "bookTitle": "Spring in Action",
    "bookAuthor": "Craig Walls",
    "bookIsbn": "978-1-61729-494-5",
    "bookCoverImage": "http://example.com/book3.jpg",
    "userId": 9,
    "userName": "Neha",
    "userEmail": "neha@gmail.com",
    "checkoutDate": "2025-12-10",
    "dueDate": "2025-12-25",
    "returnDate": "2025-12-24",
    "status": "RETURNED",
    "type": "RETURN",
    "isOverdue": false,
    "overdueDays": 0,
    "remainingDays": 0,
    "maxRenewals": 2,
    "renewalCount": 0,
    "fineAmount": 0,
    "finePaid": true,
    "notes": "completed reading",
    "createdAt": "2025-12-10T08:15:00.000000",
    "updatedAt": "2025-12-24T12:00:00.000000"
  },
  {
    "id": 29,
    "bookTitle": "Java Concurrency in Practice",
    "bookAuthor": "Brian Goetz",
    "bookIsbn": "978-0-321-34960-6",
    "bookCoverImage": "http://example.com/book4.jpg",
    "userId": 10,
    "userName": "Rahul",
    "userEmail": "rahul@gmail.com",
    "checkoutDate": "2025-11-30",
    "dueDate": "2025-12-10",
    "returnDate": null,
    "status": "OVERDUE",
    "type": "CHECKOUT",
    "isOverdue": true,
    "overdueDays": 8,
    "remainingDays": 0,
    "maxRenewals": 2,
    "renewalCount": 2,
    "fineAmount": 100,
    "finePaid": false,
    "notes": "need more time",
    "createdAt": "2025-11-30T09:00:00.000000",
    "updatedAt": "2025-12-18T09:00:00.000000"
  },
  {
    "id": 30,
    "bookTitle": "Effective Java",
    "bookAuthor": "Joshua Bloch",
    "bookIsbn": "978-0-13-468599-1",
    "bookCoverImage": "http://example.com/book5.jpg",
    "userId": 11,
    "userName": "Simran",
    "userEmail": "simran@gmail.com",
    "checkoutDate": "2025-12-01",
    "dueDate": "2025-12-15",
    "returnDate": "2025-12-16",
    "status": "RETURNED",
    "type": "RETURN",
    "isOverdue": true,
    "overdueDays": 1,
    "remainingDays": 0,
    "maxRenewals": 2,
    "renewalCount": 1,
    "fineAmount": 20,
    "finePaid": true,
    "notes": "great book",
    "createdAt": "2025-12-01T11:30:00.000000",
    "updatedAt": "2025-12-16T11:30:00.000000"
  }
];
const MyLoans = () => {
  const [activeTab, setActiveTab] = React.useState(0);


  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-300 py-8">
        <div className="px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center space-x-3">

              <span className="text-5xl">📚</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Borrowed Books
              </span>

            </h1>
            <p className="text-lg text-gray-600">
              Manage your book loans, track due dates, and renew books
            </p>



          </div>

          {/* TabList */}
          <Card className="mb-6">
            <Box sx={{
              borderBottom: 1,
              borderColor: 'divider'
            }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="loan tabs" >
                {tabs.map((tab) => <Tab key={tab.label} label={tab.label} />
                )}
              </Tabs>
            </Box>
          </Card>

          {/* Loan list */}
          <div className="space-y-4">
            {loans.map((loan) => <LoanCard key={loan.id} loan={loan} />)}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MyLoans
