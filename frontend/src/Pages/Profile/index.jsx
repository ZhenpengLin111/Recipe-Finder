import { useEffect, useRef, useState, useCallback } from "react"
import { deleteRecipe, getRecipes, updateUser } from "../../apis/users"
import './index.scss'
import { fetchRecipeByIdsAPI } from "../../apis/recipes"
import { Link } from "react-router-dom"
import { IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux"
import { fetchUserInfo } from "../../store/modules/user"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function Profile() {
  const userData = useSelector(state => state.user.userInfo)
  const [user, setUser] = useState(userData || {})
  const [recipes, setRecipes] = useState([])
  const [show, setShow] = useState(true)
  // dialog for editing user info
  const [open, setOpen] = useState(false);
  // alert message for deleting saved recipes
  const [alertOpen, setAlertOpen] = useState(false);
  const [recipeId, setRecipeId] = useState()
  const [openRecipes, setOpenRecipes] = useState(false);
  const [helperText1, setHelperText1] = useState('') // email
  const [helperText2, setHelperText2] = useState('') // username
  const [helperText3, setHelperText3] = useState('') // phone
  const [helperText4, setHelperText4] = useState('') // age
  const [emailError, setEmailError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

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
    setSelectedFile(file)
    setUser({ ...user, file: file })
  }

  const dispatch = useDispatch()


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleUpdate() {
    if (usernameError || emailError || phoneError || ageError) return
    await updateUser(user._id, user)
    dispatch(fetchUserInfo(user._id))
    handleClose()
  }

  const fetchUserRecipes = useCallback(async () => {
    try {
      if (user && user._id) {
        const recipes = await getRecipes();

        if (recipes && recipes.data && !recipes.data.message) {
          const filteredRecipes = recipes.data.filter(recipe => recipe.user === user._id);

          if (filteredRecipes.length > 0) {
            const recipe_ids = filteredRecipes.map(recipe => recipe.recipeId);
            const res = await fetchRecipeByIdsAPI(recipe_ids);

            if (res && res.data) {
              setRecipes(res.data);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [user]);  // Ensure that `fetchUserRecipes` only depends on `user`

  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);  // Include `fetchUserRecipes` as a dependency

  
  const recipesRef = useRef(null)
  // show the savedRecipes
  function toggleSavedRecipes() {
    setShow(!show)
    setOpenRecipes(!openRecipes)
  }

  function openAlert(id) {
    setAlertOpen(true)
    setRecipeId(id)
  }

  async function handleDelRecipe() {
    await deleteRecipe(recipeId)
    setAlertOpen(false)
    fetchUserRecipes()
  }

  return (
    <div className="profile">
      <div className="profile-details">
        <div className="profile-left">
          <img src={userData.profileImg} alt="profile-img" />
          <h2>{userData.username}</h2>
        </div>
        <div className="profile-right">
          <IconButton className="editBtn" onClick={handleClickOpen}>
            <EditIcon color="primary" />
          </IconButton>
          <h1>Profile Details</h1>
          <div>
            <label htmlFor="">Name:</label>
            <span>{userData.username}</span>
          </div>
          <div>
            <label htmlFor="">Age:</label>
            <span>{userData.age}</span>
          </div>
          <div>
            <label htmlFor="">Phone:</label>
            <span>{userData.phone}</span>
          </div>
          <div>
            <label htmlFor="">Email:</label>
            <span>{userData.email}</span>
          </div>
          <div>
            <label htmlFor="">Joined Date:</label>
            <span>{userData.joinDate?.slice(0, 10)}</span>
          </div>
        </div>
      </div>
      <h1 className="savedRecipes-txt">Saved Recipes:</h1>
      <IconButton onClick={toggleSavedRecipes} className="toggle-savedRecipes-btn">
        {show ? <ExpandMoreIcon fontSize="large" /> : <ExpandLessIcon fontSize="large" />}
      </IconButton>

      {openRecipes && <div className='savedRecipes' ref={recipesRef}>
        {recipes?.map((recipe) => (
          <div className="recipe-item" key={recipe.id}>
            <IconButton className="delBtn" onClick={()=> openAlert(recipe.id)}>
                <ClearIcon />
              </IconButton>
            <Link  to={`/recipe-info/${recipe.id}`} >
              <div className='recipe-img'>
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <h2>{recipe.title}</h2>
            </Link>
          </div>
        ))}
      </div>}

      <BootstrapDialog
        className="updateDialog"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold', padding: '20px' }} id="customized-dialog-title">
          Edit your profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers >
          <form className="updateForm">
            <div className="form-top">
              <img className="profileImg" src={preview ? preview : userData.profileImg} alt="profileImg" />
              <div className="form-top-right">
                <Button
                  className="upload-photo-btn"
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileUpload}
                    multiple
                    required
                  />
                </Button>
                <p>Must be PNG or JPG file</p>
              </div>
            </div>
            <div className="form-bottom">
              <div>
                <label htmlFor="">Name</label>
                <TextField
                  className="update-ipt"
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  defaultValue={user.username}
                  name="username"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={checkUsernameInput}
                  helperText={helperText2}
                  error={usernameError}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Age</label>
                <TextField
                  className="update-ipt"
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  defaultValue={user.age}
                  name="age"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={checkAgeInput}
                  helperText={helperText4}
                  error={ageError}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Phone</label>
                <TextField
                  className="update-ipt"
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  defaultValue={user.phone}
                  name="phone"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={checkPhoneInput}
                  helperText={helperText3}
                  error={phoneError}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <TextField
                  className="update-ipt"
                  defaultValue={user.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={checkEmailInput}
                  helperText={helperText1}
                  error={emailError}
                  required
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button className="cancel-Btn" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="update-Btn" type="submit" onClick={handleUpdate} variant="contained" >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Dialog
      className="alertDialog"
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <WarningAmberIcon className="warning-icon"/>
          {'Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this recipe?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="cancelDelBtn" onClick={()=> setAlertOpen(false)}>Cancel</Button>
          <Button className="delRecipeBtn" onClick={handleDelRecipe} variant="contained">
            Delete recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}