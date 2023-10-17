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
  AreaChart,
} from 'recharts'

const Chart = ({ data }: any) => {
  // destructure data for formatting
  const { analysis, date, avg } = data

  // NOTE: may be a better way to do the following
  analysis.map((item: any) => {
    date.forEach((date: any) => {
      return (item.createdAt = date.createdAt)
    })
  })

  return (
    <div className='w-full h-full'>
    <ResponsiveContainer /*width='80%' height='80%'*/ className={'sm:p-10 sm:m-10 w-4/5/4 h-4/5'}>
    <LineChart
      data={analysis}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
      <CartesianGrid stroke="#ccc" strokeDasharray={5} />
      <XAxis dataKey="createdAt" className='sm:text-sm'>
        <Label value="Date" offset={0} position={'insideBottom'} />
      </XAxis>
      <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8"/>
      <YAxis
        label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft' }}
        />
      <Tooltip />
    </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default Chart
