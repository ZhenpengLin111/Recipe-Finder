import { Login } from "../../Component/Login"
import { Register } from "../../Component/Register"
import { useEffect, useState } from "react"
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import './index.scss'
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Component/Loading";
import { ALERT } from "../../Component/Alert";
export function Landing() {
  // 0: login page, 1: register page
  const [view, setView] = useState(0)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')

  function getLoading(bol) {
    setLoading(bol)
  }

  // setting msg for the alert
  function getMsg(msg) {
    setAlert(true)
    setMessage(msg)
    setTimeout(() => {
      setAlert(false)
    }, 2000)
  }

  // swtich to login page if create account successfully
  function goLogin(bol) {
    if (bol) setView(0)
  }

  const navigate = useNavigate()
  return (
    <div className="landing">
      {alert ? <ALERT msg={message} /> : null}
      {loading ? <Loading /> : null}
      <div className="login-register">
        <FontAwesomeIcon icon={faUtensils} className='app-logo' />
        <IconButton size="large" aria-label="back" className="backBtn" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        {!view ?
          <div className="login">
            <Login onGetLoading={getLoading} onGetMsg={getMsg} />
            <div className="register-text">
              <p>Don't have an account yet? </p>
              <Link href="#" color="inherit" onClick={() => setView(1)}>
                {'Register'}
              </Link>
            </div>
          </div> :
          <div className="register">
            <Register onGetMsg={getMsg} onLogin={goLogin} />
            <div className="login-text">
              <p>Already have an account? </p>
              <Link href="#" color="inherit" onClick={() => setView(0)}>
                {'Login'}
              </Link>
            </div>
          </div>}
      </div>
      <div className="landing-background"></div>
    </div>
  )
}