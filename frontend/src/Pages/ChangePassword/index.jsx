import './index.scss'
import React from 'react';
import { useState, useRef } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { changePassword } from '../../apis/users';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export function ChangePassword() {
  const userData = useSelector(state => state.user.userInfo)
  const [user, setUser] = useState(userData || {})
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const helperTextRef = useRef(null)

  const passwordRegex = /^\S{6,15}$/
  const checkPasswordInput = async (e) => {
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(true)
      helperTextRef.current.innerHTML = 'Password must be 6 to 15 non-empty characters!'
    }
    else {
      bcrypt.compare(e.target.value, userData.password, function (err, isMatch) {
        if (isMatch) {
          setPasswordError(true)
          helperTextRef.current.innerHTML = 'Your new password must be different from previous used passwords!'
        } else {
          setPasswordError(false)
          helperTextRef.current.innerHTML = ''
        }
      });
    }
  }

  const helperTextRef2 = useRef(null)
  function confirmPassword(e) {
    if (e.target.value === user.password) {
      setConfirmPasswordError(false)
      helperTextRef2.current.innerHTML = ''
    } else {
      setConfirmPasswordError(true)
      helperTextRef2.current.innerHTML = 'Both passwords must match!'
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    if (passwordError || confirmPasswordError) return
    const res = await changePassword(user)
    if (res.status === 200) {
      setOpen(true)
    }
  }

  return (
    <div className='changePassword'>
      <div className='blurBg'>
        <form onSubmit={handleUpdate}>
          <h1>Change password</h1>
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
          <FormControl variant="outlined" className="iptbtn" error={passwordError}>
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirmpassword"
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
              label="confirmPassword"
              required
              onBlur={confirmPassword}
            />
            <FormHelperText id="my-helper-text" error={confirmPasswordError} ref={helperTextRef2}></FormHelperText>
          </FormControl>
          <Button className="update-Btn" type="submit" variant="contained" >
            Reset Password
          </Button>
        </form>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Please login Again
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Your user password has been successfully reset, please press 'Login' to login to the account again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/landing')}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}