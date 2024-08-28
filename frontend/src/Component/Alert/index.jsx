import './index.scss'
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
export function ALERT({msg}) {
  // 1: success, 0: error
  const [state, setState] = useState(1)
  useEffect(() => {
    function checkMsg() {
      if(msg === 'Login Sucessfully.' || msg === 'Account has been created, please login in.') {
        setState(1)
      } else {
        setState(0)
      }
    }
    checkMsg()
  }, [msg])
  return (
    <div className='alert'>
      {state ?
        <Alert severity="success">{msg}</Alert>
        :
        <Alert severity="error">{msg}</Alert>
      }
    </div>
  )
}