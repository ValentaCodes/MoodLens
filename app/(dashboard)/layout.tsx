// Layouts don't rerender when the route changes
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/journal',
    label: 'Journal',
  },
  {
    href: '/analysis',
    label: 'Analysis',
  },
]
// Make sure to render the children. It will serve the purpose of it being a layout component
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col ">
      <div className="sm:max-2xl:ml-[200px] sm:max-2xl:h-full">
        <header className="border-y sm:max-2xl:h-[60px] sm:max-2xl:border-b sm:max-2xl:border-black/10">
          <div className="flex items-center justify-end px-4 py-4 sm:max-2xl:h-full sm:max-2xl:w-full sm:max-2xl:px-6">
            <UserButton showName={true}/>
          </div>
        </header>
        <div className="flex text-center justify-center items-center sm:max-2xl:absolute sm:max-2xl:top-0 sm:max-2xl:w-[200px] sm:max-2xl:left-0 sm:max-2xl:border-r sm:max-2xl:h-full">
          <div className="sm:max-2xl:px-4 sm:max-2xl:py-4 ">
            <ul className="flex flex-row text-center py-4 divide-x divide-gray-200 sm:max-2xl:divide-y sm:max-2xl:divide-gray-200 sm:max-2xl:flex-col">
              {links.map((link) => (
                <li className="px-4 py-4" key={link.label}>
                  <Link href={link.href}>
                    <p className="text-2xl">{link.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
