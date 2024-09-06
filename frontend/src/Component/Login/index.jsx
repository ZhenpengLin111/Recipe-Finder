import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../apis/users";
import { useRef, useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import './index.scss'

export function Login({ onGetLoading, onGetMsg }) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [helperText1, setHelperText1] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    onGetLoading(true)
    if (!user.email || !user.password) {
      return
    }
    let res = await verifyUser(user)
    onGetLoading(false)
    if (res.token) {
      sessionStorage.setItem('User', res.token)
      axios.defaults.headers.common['authorization'] = `Bearer ${res.token}`
      onGetMsg('Login Sucessfully.')
      setTimeout(() => {
        navigate('/')
      }, 2000)
      setUser({
        email: '',
        password: ''
      })
    } else {
      onGetMsg(res.message)
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const checkEmailInput = (e) => {
    if (e.target.value === '') {
      setEmailError(true)
      setHelperText1('Please enter email!')
    }
    else {
      setEmailError(false)
      setHelperText1('')
    }
  }

  const helperTextRef = useRef(null)

  const checkPasswordInput = (e) => {
    if (e.target.value === '') {
      setPasswordError(true)
      helperTextRef.current.innerHTML = 'Please enter password!'
    }
    else {
      setPasswordError(false)
      helperTextRef.current.innerHTML = ''
    }
  }



  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome Back</h1>
      <label className="email-label">Email:</label>
      <TextField
        className="iptbtn"
        id="outlined-basic"
        label="username@gmail.com"
        variant="outlined"
        onChange={handleChange}
        onBlur={checkEmailInput}
        error={emailError}
        helperText={helperText1}
        name="email"
        required
      />
      <label className="password-label">Password:</label>
      <FormControl variant="outlined" className="iptbtn" error={passwordError}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          name="password"
          required
          onChange={handleChange}
          onBlur={checkPasswordInput}
        />
        <FormHelperText id="my-helper-text" error={passwordError} ref={helperTextRef}></FormHelperText>
      </FormControl>
      <Button type="submit" className="loginbtn" variant="contained">Sign in</Button>
    </form>
  )
}