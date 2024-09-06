import { useEffect, useState } from "react"
import { getImage, getRecipes, updateUser } from "../../apis/users"
import * as jwt_decode from 'jwt-decode'
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
import { UploadFile } from "../../Component/UploadFile"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export function Profile() {
  const [user, setUser] = useState({})
  const [recipes, setRecipes] = useState([])
  const [show, setShow] = useState(true)
  // dialog for editing user info
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  function handleFile(file) {
    setUser({ ...user, file: file })
    console.log(user)
  }

  async function handleUpdate() {
    const res = await updateUser(user._id, user)
    console.log(res)
  }


  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem('User');
      if (token) {
        const decodeUser = jwt_decode.jwtDecode(token);
        const profileImg = await getImage(decodeUser.profileImgId)
        decodeUser.profileImg = profileImg
        setUser(decodeUser);
      }
    }
    loadUserData();
  }, []); // This effect only runs once to set the user

  // useEffect(() => {
  //   async function fetchUserRecipes() {
  //     if (user && user._id) { // Ensure 'user' is set before fetching recipes
  //       const recipes = await getRecipes();
  //       const filteredRecipes = recipes.data.filter(recipe => recipe.user === user._id);
  //       const recipe_ids = filteredRecipes.map(recipe => recipe.recipeId);
  //       const res = await fetchRecipeByIdsAPI(recipe_ids);
  //       console.log('recipes:', res);
  //       setRecipes(res.data);
  //     }
  //   }
  //   fetchUserRecipes();
  // }, [user]); // This effect runs whenever 'user' changes

  // show the savedRecipes
  function toggleSavedRecipes() {
    setShow(!show)
    document.querySelector('.savedRecipes').classList.toggle('show')
  }

  return (
    <div className="profile">
      <div className="profile-details">
        <div className="profile-left">
          <img src={user.profileImg?.data} alt="profile-img" />
          <h2>{user.username}</h2>
        </div>
        <div className="profile-right">
          <IconButton className="editBtn" onClick={handleClickOpen}>
            <EditIcon color="primary" />
          </IconButton>
          <h1>Profile Details</h1>
          <div>
            <label htmlFor="">Name:</label>
            <span>{user.username}</span>
          </div>
          <div>
            <label htmlFor="">Age:</label>
            <span>{user.age}</span>
          </div>
          <div>
            <label htmlFor="">Phone:</label>
            <span>{user.phone}</span>
          </div>
          <div>
            <label htmlFor="">Email:</label>
            <span>{user.email}</span>
          </div>
          <div>
            <label htmlFor="">Joined Date:</label>
            <span>{user.joinDate?.slice(0, 10)}</span>
          </div>
        </div>
      </div>
      <h1 className="savedRecipes-txt">Saved Recipes:</h1>
      <IconButton onClick={toggleSavedRecipes} className="toggle-savedRecipes-btn">
        {show ? <ExpandMoreIcon fontSize="large" /> : <ExpandLessIcon fontSize="large" />}
      </IconButton>

      {/* <div className='savedRecipes'>
        {recipes?.map((recipe) => (
          <Link key={recipe.id} to={`/recipe-info/${recipe.id}`} className="recipe-item">
            <IconButton className="delBtn">
              <ClearIcon />
            </IconButton>
            <div className='recipe-img'>
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <h2>{recipe.title}</h2>
          </Link>
        ))}
      </div> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Profile
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
        <DialogContent dividers>
          <form onSubmit={handleUpdate}>
            <UploadFile onFile={handleFile} />
            <div>
              <label htmlFor="">Name:</label>
              <input name="username" type="text" value={user.username} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="">Age:</label>
              <input name="age" type="text" value={user.age} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="">Phone:</label>
              <input name="phone" type="text" value={user.phone} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input name="email" type="text" value={user.email} onChange={handleChange} />
            </div>
          </form>
        </DialogContent>
       
      </BootstrapDialog>
    </div>
  )
}