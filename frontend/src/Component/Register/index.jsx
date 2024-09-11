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
import { UploadFile } from "../UploadFile";

export function Register({ onGetMsg, onLogin }) {
  const [user, setUser] = useState({
    username: '',
    age: '',
    email: '',
    password: '',
    phone: '',
    file: ''
  })
  const [helperText1, setHelperText1] = useState('')
  const [helperText2, setHelperText2] = useState('')
  const [helperText3, setHelperText3] = useState('')
  const [helperText4, setHelperText4] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
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

  const ageRegex = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
  const checkAgeInput = (e) => {
    if (!ageRegex.test(e.target.value)) {
      setAgeError(true)
      setHelperText4('Age is invaild!')
    }
    else {
      setAgeError(false)
      setHelperText4('')
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

  const phoneRegex = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
  const checkPhoneInput = (e) => {
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError(true)
      setHelperText3('Please enter an vaild phone number!')
    }
    else {
      setPhoneError(false)
      setHelperText3('')
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

  function handleFile(file) {
    setUser({ ...user, file: file })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (usernameError || emailError || phoneError || ageError || passwordError) return
    const res = await createUser(user)
    console.log(res)
    if (!res.data.message) {
      onGetMsg('Account has been created, please login in.')
      setUser({
        username: '',
        age: '',
        email: '',
        password: '',
        phone: '',
        file: ''
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
      <label className="age-label">Age:</label>
      <TextField
        className="iptbtn"
        id="outlined-basicc"
        label="Age"
        variant="outlined"
        onChange={handleChange}
        onBlur={checkAgeInput}
        error={ageError}
        helperText={helperText4}
        name="age"
        required
      />
      <label className="phone-label">Phone:</label>
      <TextField
        className="iptbtn"
        id="outlined-basicss"
        label="Phone"
        variant="outlined"
        onChange={handleChange}
        onBlur={checkPhoneInput}
        error={phoneError}
        helperText={helperText3}
        name="phone"
        required
      />
      <UploadFile onFile={handleFile} />
      <Button type="submit" className="loginbtn" variant="contained">Register</Button>
    </form>
  )
}