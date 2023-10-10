'use client'

import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const Chart = ({ data }: any) => {
  console.log(data);
  
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={data.analysis}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="createdAt" />
        <YAxis dataKey="sentimentScore" />
        <Tooltip />
      </LineChart>
      <div>Average: {data.avg}</div>
    </div>
  )
}

export default Chart
