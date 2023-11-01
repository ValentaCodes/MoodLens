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

  const CustomTooltip = ({ payload, label, active }: any) => {
    const color = payload.map((x: any) => {
      return x.payload.color
    })
    if (active && payload && payload.length) {
      console.log(payload[0].payload.color)
      return (
        <div className="border rounded-md h-40 w-60 bg-gray-200">
          <div className={`bg-[${payload[0].payload.color}] h-1/5 w-1/5`} />
          <div className={`bg-[${color[0]}] h-1/5 w-1/5`} />
          <p className="">{`${label}`}</p>
          <p>{payload[0].value}</p>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-row justify-center">
      <ResponsiveContainer width="95%" height="100%">
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
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
