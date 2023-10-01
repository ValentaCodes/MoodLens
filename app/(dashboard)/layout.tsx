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
    <div className="h-screen w-screen relative">
      <aside className="absolute top-0 w-[200px] left-0 border-r h-full">
        <div className="px-4 py-4">
          <ul className="divide-y divide-gray-200">
            {links.map((link) => (
              <li className=" py-5" key={link.label}>
                <Link href={link.href}>
                  <p className="text-2xl">{link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton showName={true} />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
