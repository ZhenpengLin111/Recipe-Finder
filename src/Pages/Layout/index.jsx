import Navbar from "../../Component/Navbar"
import './index.scss'
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div className="Layout">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout