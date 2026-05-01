import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const StatsCard = ({bgColor, icon, value, title, subTitle, textColor}) => {
  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between mb-4'>
          <div className={`p-3 rounded-l ${bgColor}`}>
            {icon}

          </div>
            <span className={`text-2xl font-bold ${textColor}`}>
              {value}
            </span>

        </div>


        <p className={`text-gray-600 font-semibold mb-1 ${textColor}`}>
          {title}
        </p>
        <p>
          {subTitle}
        </p>
      </CardContent>
    </Card>
  )
}

export default StatsCard
