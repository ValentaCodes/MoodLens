'use client'

import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const Chart = ({ data }: any) => {
  return (
      <LineChart
        width={730}
        height={300}
        data={data.analysis}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray={5} />
        <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" />
        <XAxis dataKey="createdAt" order={'dsc'}/>
        <YAxis />
        <Tooltip />
      </LineChart>
  )
}

export default Chart
