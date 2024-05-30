import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Footer from '../Component/Footer';
import "../Styles/NutrientsSearch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import pic22 from "../assets/pic22.jpg";
import { fetchRecipesByNutrientsAPI } from '../apis/recipes';

function NutrientsSearch() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1000);
  const [minProtein, setMinProtein] = useState(0);
  const [maxProtein, setMaxProtein] = useState(100);
  const [minFat, setMinFat] = useState(0);
  const [maxFat, setMaxFat] = useState(100);
  const [minCarbs, setMinCarbs] = useState(0);
  const [maxCarbs, setMaxCarbs] = useState(100);

  const [recipeVisibility, setRecipeVisibility] = useState([]);
  const [recipeVisibility2, setRecipeVisibility2] = useState([]);
  const [recipeVisibility3, setRecipeVisibility3] = useState([]);

  function showResults() {
    const Results = document.querySelector('.Results');
    Results.classList.add('show');
  }

  function closeResults() {
    const Results = document.querySelector('.Results');
    Results.classList.remove('show');
  }

  const showTop = (index) => {
    const updatedVisibility = [...recipeVisibility];
    updatedVisibility[index] = true;
    setRecipeVisibility(updatedVisibility);
  };

  const hideTop = (index) => {
    const updatedVisibility = [...recipeVisibility];
    updatedVisibility[index] = false;
    setRecipeVisibility(updatedVisibility);
  };

  const showTop2 = (index) => {
    const updatedVisibility2 = [...recipeVisibility2];
    updatedVisibility2[index] = true;
    setRecipeVisibility2(updatedVisibility2);
  };

  const hideTop2 = (index) => {
    const updatedVisibility2 = [...recipeVisibility2];
    updatedVisibility2[index] = false;
    setRecipeVisibility2(updatedVisibility2);
  };

  const showTop3 = (index) => {
    const updatedVisibility3 = [...recipeVisibility3];
    updatedVisibility3[index] = true;
    setRecipeVisibility3(updatedVisibility3);
  };

  const hideTop3 = (index) => {
    const updatedVisibility3 = [...recipeVisibility3];
    updatedVisibility3[index] = false;
    setRecipeVisibility3(updatedVisibility3);
  };

  const fetchRecipes = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetchRecipesByNutrientsAPI({
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minFat,
        maxFat,
        minCarbs,
        maxCarbs
      })
      setRecipes(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Nutrients">
      <Helmet>
        <title>NutrientsSearch | Recipe Finder</title>
      </Helmet>
      <div className='Content'>
        <div className='Nutrients-Search-content'>
          <div className="Search-top">
            <h1>Search Recipes by Nutrients</h1>
            <form onSubmit={fetchRecipes} className='Nutrients-form'>
              <div className='type'>
                <div className='Nutrients-type'>
                  <label>Min-Calories:</label>
                  <div>
                    <input type="range" min="0" max="1000" value={minCalories} onChange={(e) => setMinCalories(e.target.value)} />
                    <span>{minCalories}</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Max-Calories:</label>
                  <div>
                    <input type="range" min="0" max="1000" value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} />
                    <span>{maxCalories}</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Min-Protein:</label>
                  <div>
                    <input type="range" min="0" max="100" value={minProtein} onChange={(e) => setMinProtein(e.target.value)} />
                    <span>{minProtein}g</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Max-Protein:</label>
                  <div>
                    <input type="range" min="0" max="100" value={maxProtein} onChange={(e) => setMaxProtein(e.target.value)} />
                    <span>{maxProtein}g</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Min-Carbs:</label>
                  <div>
                    <input type="range" min="0" max="100" value={minCarbs} onChange={(e) => setMinCarbs(e.target.value)} />
                    <span>{minCarbs}g</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Max-Carbs:</label>
                  <div>
                    <input type="range" min="0" max="100" value={maxCarbs} onChange={(e) => setMaxCarbs(e.target.value)} />
                    <span>{maxCarbs}g</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Min-Fat:</label>
                  <div>
                    <input type="range" min="0" max="100" value={minFat} onChange={(e) => setMinFat(e.target.value)} />
                    <span>{minFat}g</span>
                  </div>
                </div>
                <div className='Nutrients-type'>
                  <label>Max-Fat:</label>
                  <div>
                    <input type="range" min="0" max="100" value={maxFat} onChange={(e) => setMaxFat(e.target.value)} />
                    <span>{maxFat}g</span>
                  </div>
                </div>
              </div>
              <button type="submit" onClick={showResults}>Search</button>
            </form>
          </div>
          <img src={pic22} alt='' />
        </div>

        <div className='Results'>
          <h1>Search Results:</h1>
          <span className='close' onClick={closeResults}><i>&times;</i></span>
          <div className='recipe-container'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {recipes.map((recipe, index) => (
              <Link key={recipe.id} to={`/recipe-info/${recipe.id}`} className="recipe-item">
                {console.log(recipe.id)}
                <div className='recipe-img'>
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <h2>{recipe.title}</h2>
                <div className="recipe-details">
                  <div className='recipe-left'>
                    <p><FontAwesomeIcon icon={faFire} className='fire' />{recipe.calories} Calories </p>
                  </div>
                  <div className='recipe-right'>
                    <p>
                      <span className={`recipe-right-top top1 ${recipeVisibility[index] ? 'visible' : ''}`}>
                        {recipe.protein} Protein
                      </span>
                      <span className='b1'
                        onMouseOver={() => showTop(index)}
                        onMouseOut={() => hideTop(index)}><i className='min m1' />{recipe.protein}
                      </span>
                    </p>
                    <p>
                      <span className={`recipe-right-top top2 ${recipeVisibility2[index] ? 'visible' : ''}`}>
                        {recipe.fat} Fat
                      </span>
                      <span className='b2'
                        onMouseOver={() => showTop2(index)}
                        onMouseOut={() => hideTop2(index)}><i className='min m2' />{recipe.fat}
                      </span>
                    </p>
                    <p>
                      <span className={`recipe-right-top top3 ${recipeVisibility3[index] ? 'visible' : ''}`}>
                        {recipe.carbs} Carbs
                      </span>
                      <span className='b3'
                        onMouseOver={() => showTop3(index)}
                        onMouseOut={() => hideTop3(index)}><i className='min m3' />{recipe.carbs}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <div className='Footer'>
        <Footer />
      </div>
    </div>

  )
}

export default NutrientsSearch;