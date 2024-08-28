import Navbar from "../../Component/Navbar"
import './index.scss'
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
const Layout = () => {
  useEffect(() => {
    let token = sessionStorage.getItem('User')
    if(token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    }
  }, [])
  return (
    <div className="Layout">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout