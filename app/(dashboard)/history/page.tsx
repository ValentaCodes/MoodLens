import Chart from '@/components/Chart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'


const getData = async () => {
  const user = await getUserByClerkId()
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      sentimentScore: true,
      createdAt: true,
    },
  })
  const sum = analysis.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.sentimentScore
  }, 0)
  const avg = Math.round(sum / analysis.length)

  return { analysis, avg }
}

const HistoryPage = async () => {
  const analysis = await getData()
  return (
    <div>
      <Chart data={analysis}></Chart>
    </div>
  )
}

export default HistoryPage
