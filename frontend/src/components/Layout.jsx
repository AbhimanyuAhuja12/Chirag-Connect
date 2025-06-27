import Sidebar from "./Sidebar"

const Layout = ({ children, user }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user} />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Layout