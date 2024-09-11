import Navbar from "../../Component/Navbar"
import './index.scss'
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserInfo } from "../../store/modules/user"
import { decodedUser } from "../../utils/token"
const Layout = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  // Get userInfo
  useEffect(() => {
    if (token) {
      const decodeUser = decodedUser(token)
      dispatch(fetchUserInfo(decodeUser._id))
    }
  }, [dispatch, token])
  // useEffect(() => {
  //   let token = sessionStorage.getItem('User')
  //   if (token) {
  //     axios.defaults.headers.common['authorization'] = `Bearer ${token}`
  //   }
  // }, [])
  return (
    <div className="Layout">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout