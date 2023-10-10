'use client'

import React from 'react'

const Chart = ({ analysis }: any) => {
  // const date = analysis?.createdAt.getDate()
  console.log(analysis?.sentimentScore)
  return (
    <div>
      Score: {}
      <div>Average: {}</div>
    </div>
  )
}

export default Chart
