import { request } from "../utils"

// Users
export async function createUser(user) {
  await createImage(user.file)
  const profileImgId = user.file.name

  // pass down the profileImgId to the post object
  user.profileImgId = profileImgId
  const res = await request.post(`/users`, user)
  return res
}

export async function getUser(id) {
  const res = await request.get(`/users/${id}`)
  let user = res.data
  const profileImg = await getImage(user.profileImgId)
  user.profileImg = profileImg.data
  return user
}

export async function updateUser(id, user) {
  // delete old image first
  if (user.file) {
    await delImage(user.profileImgId)
    await createImage(user.file)
    const profileImgId = user.file.name

    // pass down the profileImgId to the post object
    user.profileImgId = profileImgId
  }
  user.profileImg = ''
  const res = await request.put(`/users/${id}`, user)
  return res
}

export async function changePassword(user) {
  user.profileImg = ''
  const res = await request.put(`/users/password/${user._id}`, user)
  return res
}

export async function verifyUser(user) {
  const res = await request.post(`/users/login`, user)
  return res.data
}

// Recipes
export async function savedRecipe(recipe) {
  const res = await request.post(`/savedRecipes`, recipe)
  return res
}

export async function getRecipes() {
  const res = await request.get(`/savedRecipes`)
  return res
}

export async function deleteRecipe(id) {
  const res = await request.delete(`/savedRecipes/${id}`)
  return res
}

// AWS functions for images
export async function createImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await request.post(`/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res
}

export async function getImage(id) {
  const res = await request.get(`/images/${id}`)
  return res
}

export async function delImage(id) {
  const res = await request.delete(`/images/${id}`)
  return res
}
