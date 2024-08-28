import { useEffect, useState } from "react"
import { getRecipes, getUser } from "../../apis/users"
import { savedRecipe } from "../../apis/users"
import * as jwt_decode from 'jwt-decode'
import './index.scss'
import { fetchRecipeByIdsAPI } from "../../apis/recipes"

export function Profile() {
  const [user, setUser] = useState({})
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem('User')
      if (token) {
        const decodeUser = jwt_decode.jwtDecode(token)
        setUser(decodeUser)
        const recipes = await getRecipes()
        const filteredRecipes = recipes.data.filter(recipe => recipe.user === user._id)
        const recipe_ids = filteredRecipes.map(recipe => recipe.recipeId)
        // const res = await fetchRecipeByIdsAPI(recipe_ids)
        // setRecipes(res.data)
      }
    }
    loadUserData()
  }, [])

  // async function getRecipes() {
  //   const res = await axios.get('https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429', {
  //     params: {
  //       apiKey: "4f630803698b4cbd930e7660732d2328"
  //     }
  //   })
  //   console.log(res)
  // }

  // save recipt to the user
  async function handleCheck(e) {
    if (e.target.checked) {
      const recipe = {
        recipeId: 23456,
        user: '',
        dateSaved: new Date()
      }
      await savedRecipe(recipe)
    }
  }

  return (
    <div className="profile">
      <h1>{user.username}</h1>
      <h2>{user.email}</h2>
      <h3>{user.joinDate}</h3>
      {/* <button onClick={getRecipes}>Search</button> */}
      <input type="checkbox" onChange={handleCheck} />
    </div>
  )
}