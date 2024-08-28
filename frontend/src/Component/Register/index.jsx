import { useState, useRef } from "react"
import { createUser } from "../../apis/users"
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

export function Register({ onGetMsg, onLogin }) {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [helperText1, setHelperText1] = useState('')
  const [helperText2, setHelperText2] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const usernameRegex = /^.{4,15}$/
  const checkUsernameInput = (e) => {
    if (!usernameRegex.test(e.target.value)) {
      setUsernameError(true)
      setHelperText2('Username must be 5 and 15 characters!')
    }
    else {
      setUsernameError(false)
      setHelperText2('')
    }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const checkEmailInput = (e) => {
    if (!emailRegex.test(e.target.value)) {
      setEmailError(true)
      setHelperText1('Please enter an vaild email!')
    }
    else {
      setEmailError(false)
      setHelperText1('')
    }
  }

  const helperTextRef = useRef(null)

  const passwordRegex = /^\S{6,15}$/
  const checkPasswordInput = (e) => {
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(true)
      helperTextRef.current.innerHTML = 'Password must be 6 to 15 non-empty characters!'
    }
    else {
      setPasswordError(false)
      helperTextRef.current.innerHTML = ''
    }
  }


  async function handleSubmit(e) {
    e.preventDefault()
    const res = await createUser(user)
    console.log(res)
    if (!res.data.message) {
      onGetMsg('Account has been created, please login in.')
      setUser({
        username: '',
        email: '',
        password: ''
      })
      onLogin(true)
    } else {
      onGetMsg(`User account could not be created :(, ${res.data.message}.`)
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      {/* <input name="username" required placeholder="Please Enter Username" onChange={handleChange} maxLength={20}/>
    <input name="email" required placeholder="Please Enter Email" onChange={handleChange} maxLength={20}/>
    <input name="password" required placeholder="Please Enter password" onChange={handleChange} maxLength={20}/>
    <button type="sumbit">Register</button> */}
      <label className="username-label">Username:</label>
      <TextField
        className="iptbtn"
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={handleChange}
        onBlur={checkUsernameInput}
        error={usernameError}
        helperText={helperText2}
        name="username"
        required
      />
      <label className="email-label">Email:</label>
      <TextField
        className="iptbtn"
        id="outlined-basics"
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
      <Button type="submit" className="loginbtn" variant="contained">Register</Button>
    </form>
  )
}