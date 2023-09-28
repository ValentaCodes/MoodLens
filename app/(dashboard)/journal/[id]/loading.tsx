'use client'

import { useTime, useTransform, motion } from 'framer-motion'

const LoadingAnalysis = () => {
  const time = useTime()
  const rotate = useTransform(
    time,
    [0, 4000], // For every 4 seconds...
    [0, 360], // ...rotate 360deg
    { clamp: false }
  )

  return (
    <div className="absolute top-2/4 left-1/3 flex items-center justify-center">
      <motion.div
        style={{ rotate }}
        className="bg-black rounded-2xl w-40 h-40"
      />
      <h2 className="text-center z-10 text-white absolute">Analyzing entry</h2>
    </div>
  )
}

export default LoadingAnalysis
