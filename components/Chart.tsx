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
    <div className="w-full h-full flex flex-row justify-center">
      <ResponsiveContainer width="85%" height="90%">
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
