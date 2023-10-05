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
        <header className="sm:max-2xl:h-[60px] border-b border-black/10">
          <div className="sm:max-2xl:h-full sm:max-2xl:w-full sm:max-2xl:px-6 flex items-center justify-end">
            <UserButton showName={true} />
          </div>
        </header>
        <div className="sm:max-2xl:absolute sm:max-2xl:top-0 sm:max-2xl:w-[200px] sm:max-2xl:left-0 sm:max-2xl:border-r sm:max-2xl:h-full align-center">
          <div className="sm:max-2xl:px-4 sm:max-2xl:py-4">
            <ul className="sm:max-2xl:divide-y sm:max-2xl:divide-gray-200 flex flex-row sm:max-2xl:flex-col">
              {links.map((link) => (
                <li className=" py-5" key={link.label}>
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
