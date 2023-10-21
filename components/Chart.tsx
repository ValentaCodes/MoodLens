'use client'

import React from 'react'
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
 import { formatDate } from '@/utils/formatDate'
const Chart = ({ data }: any) => {
  
  // destructure data for formatting
  const { analysis, date } = data

  formatDate(analysis, date)

  // TODO customize tooltip to show mood and color on hover
  // const CustomTooltip = ({payload, label, active}) => {
  //   return (
  //   <div>
  //     <div>

  //     </div>
  //   </div>
  //   )
  // }
  
  return (
    <div className="w-full h-full flex flex-row justify-center">
      <ResponsiveContainer width="95%" height="100%" >
        <LineChart
          data={analysis}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#b91c1c" strokeDasharray={10} />
          <XAxis dataKey="createdAt" className="text-sm lg:text-lg">
            <Label value="Date" offset={0} position={'insideBottom'} />
          </XAxis>
          <Line type="bumpX" dataKey="sentimentScore" stroke="#8884d8" />
          <YAxis
            label={{
              value: 'Sentiment Score',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
