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
      <div className="sm:ml-[200px] sm:h-full">
        <header className="border-y sm:2xl:h-[60px] sm:border-b sm:border-black/10">
          <div className="flex items-center justify-end px-4 py-4 sm:h-full sm:w-full sm:px-6">
            <UserButton showName={true} afterSignOutUrl={links[0].href} />
          </div>
        </header>
        <div className="flex text-center justify-center items-center sm:absolute sm:top-0 sm:w-[200px] sm:left-0 sm:border-r sm:h-full">
          <div className="sm:px-4 sm:py-4">
            <ul className="flex flex-row text-center sm:py-4 divide-gray-200 sm:divide-y sm:divide-gray-200 sm:flex-col ">
              {links.map((link) => (
                <li className="px-4 py-4" key={link.label}>
                  <Link href={link.href}>
                    <p className="text-2xl ease-in-out duration-200 hover:rotate-6">
                      {link.label}
                    </p>
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
