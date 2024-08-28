import './index.scss'
import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
  return (
    <div className='loading'>
      <CircularProgress 
      className='circularProgress' 
      sx={{color: 'black', }}
      size={100}
      />
    </div>
  )
}