import './index.scss'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material"
import { useState, useEffect, useRef } from 'react';

export function UploadFile({ onFile }) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // maximum file size 15MB
  const MAX_FILE_SIZE = 15000000

  const inputFile = useRef(null)
  function handleFileUpload(e) {
    console.log(1)
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    const file = e.target.files[0]
    // check for file type, has to be image jpg or png
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'))
    if (fileExtension !== '.jpg' && fileExtension !== '.jpeg' && fileExtension !== '.png') {
      alert('Files must be jpg or png')
      // if file type is not jpg or png, wipe out the input field and retain the input type
      inputFile.current.value = ''
      inputFile.current.type = 'file'
      return
    }
    // check if the file size exceed the limit
    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the limit (15 Mb)')
      inputFile.current.value = ''
      inputFile.current.type = 'file'
      return
    }
    console.log(file)
    setSelectedFile(file)
    onFile(file)
  }

  // unselect file, clear preview
  function unSelectFile() {
    console.log(11)
    setSelectedFile(undefined)
    setPreview(undefined)
  }

  return (
    <div className='upload-file'>
      <label className="profileImg-label">Profile Image:</label>
      <div className="select-file">
        <IconButton aria-label="add-image" className="profileImg-btn">
          <AddIcon />
          <input className="profileImg-upload-btn" type="file" onChange={handleFileUpload} ref={inputFile} required />
        </IconButton>
        {selectedFile &&
          <div className="preview">
            <IconButton aria-label="delete" size="large" className="deleteBtn" onClick={unSelectFile}>
              <DeleteIcon className="delIcon" fontSize="inherit" />
            </IconButton>
            <img className="preview-img" src={preview} alt="preview" />
          </div>
        }
      </div>
    </div>
  )
}