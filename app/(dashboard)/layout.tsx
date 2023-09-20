// Layouts don't rerender when the route changes
import { UserButton } from '@clerk/nextjs'

// Make sure to render the children. It will serve the purpose of it being a layout component
const DashboardLayout = ({ children }: any) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute top-0 w-[200px] left-0 h-full border-r border-black/10">
        MoodLens
      </aside>
      <div className="ml-[200px]">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
