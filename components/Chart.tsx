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
    <LineChart
      width={730}
      height={300}
      data={analysis}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid stroke="#ccc" strokeDasharray={5} />
      <XAxis dataKey="createdAt">
        <Label value="Date" offset={0} position={'insideBottom'} />
      </XAxis>
      <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" />
      <YAxis
        label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft' }}
      />
      <Tooltip />
    </LineChart>
  )
}

export default Chart
