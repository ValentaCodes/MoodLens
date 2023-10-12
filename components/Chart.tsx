'use client'

import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import dynamic from 'next/dynamic'

const Chart = ({ data }: any) => {
  // console.log(data)

  return (
      <LineChart
        width={730}
        height={300}
        data={data.analysis}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray={5} />
        <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
      </LineChart>
  )
}

export default Chart
