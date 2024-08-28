import axios from "axios"
const URL = 'http://localhost:5001'

// Users
export async function createUser(user) {
  const res = await axios.post(`${URL}/users`, user)
  return res
}

export async function getUser(id) {
  const res = await axios.post(`${URL}/users/:${id}`)
  return res
}

export async function updateUser(id, user) {
  const res = await axios.post(`${URL}/users/:${id}`, user)
  return res
}

export async function verifyUser(user) {
  const res = await axios.post(`${URL}/users/login`, user)
  console.log(res)
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

