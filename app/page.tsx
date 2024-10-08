import Link from 'next/link'
import useAuth from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  // make href dynamic based on user status
  const { userId } = auth()
  console.log(userId, "USER")
  let href = userId ? '/journal' : '/sign-up'

  // In tailwind w-screen&h-screen represent 100%vh/vw
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white px-4">
      <div className="w-full max-w-[800px] mx-auto text-center sm:text-left">
        <h1 className="text-5xl sm:text-6xl">
          MoodLens, Your Ultimate Writing Companion
        </h1>
        <p className="text-2xl text-white/50 my-4">
          MoodLens leverages advanced artificial intelligence to analyze and
          rank the mood of your journal entries, providing you with unparalleled
          insights into your emotions and experiences.
        </p>
        <div>
          <Link href={href}>
            <button className="px-4 py-2 rounded-lg text-xl bg-red-700">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
