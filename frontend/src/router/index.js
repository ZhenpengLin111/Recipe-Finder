import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import IngredientsSearch from "../Pages/IngredientsSearch";
import NutrientsSearch from "../Pages/NutrientsSearch"
import RecipeInfo from "../Pages/RecipeInfo";
import { Landing } from "../Pages/Landing";
import { Profile } from "../Pages/Profile";

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
      },
      {
        path: 'profile',
        element: <Profile />
      },
    ]
  },
  {
    path: '/landing',
    element: <Landing />
  },
])

export default router