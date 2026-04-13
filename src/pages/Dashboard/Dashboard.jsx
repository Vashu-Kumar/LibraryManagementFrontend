import React from 'react'
import StatsCard from './StatsCard'
import { StatsConfig } from './StatsConfig'
import AutoAwesome from '@mui/icons-material/AutoAwesome'
import LinearProgress from '@mui/material/LinearProgress'
import { Box, Tabs, Tab } from '@mui/material'
import CurrentLoan from './CurrentLoan'
import Reservation from './Reservation'
import ReadingHistory from './ReadingHistory'
import Recommendation from './Recommendation'

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const statsData = StatsConfig({
    myLoans: [1, 2, 3],
    reservations: [1, 2],
    stats: { readingStreak: 5 }
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-400 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-blue-900 mb-2'>
            My{" "}
            <span className='bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
              Dashboard
            </span>
          </h1>
          <p className='text-lg text-gray-600'>Track your reading journey and manage your library</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((item) => (
            <StatsCard
              key={item.id}
              bgColor={item.bgColor}
              icon={item.icon}
              value={item.value}
              title={item.title}
              subTitle={item.subTitle}
            />
          ))}
        </div>


        {/* Reading Progress */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-1'>
                2026 Reading Goal
              </h3>
              <p className='text-gray-500 text-sm'>{250} of {30} books read</p>
            </div>
            <div className='p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full'>
              <AutoAwesome sx={{ fontSize: 32, color: "#7c3aed" }} />
            </div>
          </div>
          <LinearProgress variant="determinate" value={30}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#E0E7FF',
              "& .MuiLinearProgress-bar": {
                backgroundColor: "linear-gradient(90deg, #1834af 0%, #9333EA 100%",
                borderRadius: 5,
              }
            }}
          />
          <p className='text-sm text-gray-700 mt-2'>
            70%
          </p>
        </div>


        {/* Tab section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#ec481f",
                },
                "& .Mui-selected": {
                  color: "#1c4ce9",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#9333EA",
                }
              }}

              value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Current Loans" />
              <Tab label="Reservations" />
              <Tab label="Reading History" />
              <Tab label="Recommendations" />
            </Tabs>
          </Box>

          {/* current loans Tab */}
          {activeTab === 0 && <CurrentLoan />}
          {/* reservations Tab */}
          {activeTab === 1 && <Reservation />}
          {/* reading history Tab */}
          {activeTab === 2 && <ReadingHistory />}
          {/* recommendations Tab */}
          {activeTab === 3 && <Recommendation />}

        </div>


      </div>
    </div>
  )
}

export default Dashboard