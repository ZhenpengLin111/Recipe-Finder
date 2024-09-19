import axios from "axios";
import { getToken, decodedUser } from "../utils";
// API key
const API_KEY = "4f630803698b4cbd930e7660732d2328";
// const API_KEY = decodedUser(getToken()).API_KEY
// console.log(API_KEY)
// Fetch recipes by nutrients
const fetchRecipesByNutrientsAPI = ({
  minCalories,
  maxCalories,
  minProtein,
  maxProtein,
  minFat,
  maxFat,
  minCarbs,
  maxCarbs, }) => {
  return axios.get('https://api.spoonacular.com/recipes/findByNutrients', {
    params: {
      minCalories,
      maxCalories,
      minProtein,
      maxProtein,
      minFat,
      maxFat,
      minCarbs,
      maxCarbs,
      apiKey: API_KEY
    }
  })
}

// Fetch recipes by ingredients
const fetchRecipesByIngredientsAPI = (ingredients) => {
  return axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
    params: {
      ingredients,
      apiKey: API_KEY
    }
  })
}

// Fetch nutrients info
const fetchNutrientsInfoAPI = (id) => {
  return axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`, {
    headers: {
      "x-api-key": API_KEY
    }
  })
}

// Fetch recipe info
const fetchRecipeInfoAPI = (id) => {
  return axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    headers: {
      "x-api-key":API_KEY
    }
  })
}

// Fetch recipes by a list of ids
const fetchRecipeByIdsAPI = (ids) => {
  return axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}`, {
    headers: {
      "x-api-key":API_KEY
    }
  })
}

export {
  fetchRecipesByNutrientsAPI,
  fetchRecipesByIngredientsAPI,
  fetchNutrientsInfoAPI,
  fetchRecipeInfoAPI,
  fetchRecipeByIdsAPI
}