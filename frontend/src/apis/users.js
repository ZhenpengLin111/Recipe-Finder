import axios from "axios"
const URL = 'http://localhost:5001'

// Users
export async function createUser(user) {
  const data = await createImage(user.file)
  const profileImgId = user.file.name

  // pass down the profileImgId to the post object
  user.profileImgId = profileImgId
  const res = await axios.post(`${URL}/users`, user)
  return res
}

export async function getUser(id) {
  const res = await axios.post(`${URL}/users/${id}`)
  return res
}

export async function updateUser(id, user) {
  // delete old image first
  const data = await delImage(user.profileImgId)
  console.log(data)
  await createImage(user.file)
  const profileImgId = user.file.name

  // pass down the profileImgId to the post object
  user.profileImgId = profileImgId
  const res = await axios.post(`${URL}/users/${id}`, user)
  return res
}

export async function verifyUser(user) {
  const res = await axios.post(`${URL}/users/login`, user)
  if (res.data.success) {
    return res.data
  } else {
    return res.data
  }
}

// Recipes
export async function savedRecipe(recipe) {
  const res = await axios.post(`${URL}/savedRecipes`, recipe)
  return res
}

export async function getRecipes() {
  const res = await axios.get(`${URL}/savedRecipes`)
  return res
}

export async function deleteRecipe(id) {
  const res = await axios.delete(`${URL}/savedRecipes/${id}`)
  return res
}

// AWS functions for images
export async function createImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await axios.post(`${URL}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res
}

export async function getImage(id) {
  const res = await axios.get(`${URL}/images/${id}`)
  return res
}

export async function delImage(id) {
  const res = await axios.delete(`${URL}/images/${id}`)
  return res
}
