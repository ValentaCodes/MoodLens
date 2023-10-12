import Chart from '@/components/Chart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import dynamic from 'next/dynamic'
import React from 'react'
import { revalidateHistoryPage } from '@/utils/actions'

const getData = async () => {
  try {
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
  } catch (e) {
    console.error(e)
  }
  await revalidateHistoryPage()
}

const MyChart = dynamic(() => import('@/components/Chart'), {ssr: false})
const HistoryPage = async () => {
  const analysis = await getData()
  return (
    <div>
      <MyChart data={analysis}></MyChart>
    </div>
  )
}

export default HistoryPage
