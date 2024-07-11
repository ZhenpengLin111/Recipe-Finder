import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import IngredientsSearch from "../Pages/IngredientsSearch";
import NutrientsSearch from "../Pages/NutrientsSearch"
import RecipeInfo from "../Pages/RecipeInfo";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'nutrientsSearch',
        element: <NutrientsSearch />
      },
      {
        path: 'IngredientsSearch',
        element: <IngredientsSearch />
      },
      {
        path: 'recipe-info/:id',
        element: <RecipeInfo />
      }
    ]
  },
  
])

export default router