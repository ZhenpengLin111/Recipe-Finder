// RecipeInfo.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "../Styles/RecipeInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireBurner } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Footer from '../Component/Footer';
import { fetchNutrientsInfoAPI, fetchRecipeInfoAPI } from '../apis/recipes';

ChartJS.register(ArcElement, Tooltip, Legend);

function RecipeInfo() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [nutrients, setNutrients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get nutrients info for chart
    const fetchNutrients = async () => {
      try {
        const res = await fetchNutrientsInfoAPI(id)
        setNutrients(res.data);
      } catch (error) {
        setError('Failed to fetch nutrients information. Please try again later');
      }
    };
    fetchNutrients();
  }, [id]);

  useEffect(() => {
    // Get recipe info
    const fetchRecipeInfo = async () => {
      try {
        const res = await fetchRecipeInfoAPI(id)
        setRecipeInfo(res.data)
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch recipe information. Please try again later.');
        setLoading(false);
      }
    };
    fetchRecipeInfo();
  }, [id]);

  function extractRecipeDescription(summary) {
    // Remove <b> tags
    const withoutBoldTags = summary.replace(/<b>/g, '').replace(/<\/b>/g, '');

    // Extract text before <a href...>
    const match = withoutBoldTags.match(/(.*?)(?=<a href)/);
    const description = match ? match[1] : withoutBoldTags;

    return description.trim();
  }
  const recipeDescription = recipeInfo ? extractRecipeDescription(recipeInfo.summary) : '';
  console.log(recipeDescription);

  const nutrientData = nutrients?.nutrients
    ?.filter(nutrient => nutrient.name === 'Fat' || nutrient.name === 'Calories' || nutrient.name === 'Carbohydrates' || nutrient.name === 'Protein')
    ?.map((nutrient) => nutrient.amount);

  console.log(nutrientData);


  const chartData = {
    labels: ['Calories', 'Fat', 'Carbohydrates', 'Protein'],
    datasets: [
      {
        data: nutrientData,
        backgroundColor: ['blue', 'orange', 'green', 'red'], // You can customize the colors
      },
    ],
  };




  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipeInfo) {
    return <p>No recipe information available.</p>;
  }

  return (
    <div className="RecipeInfo">
      <Helmet>
        <title>{recipeInfo.title} | Recipe Finder</title>
      </Helmet>
      <div className='RecipeInfo-container'>
        <div className='RecipeInfo-main'>
          <img src={recipeInfo.image} alt={recipeInfo.title} />
          <div className='RecipeInfo-left'>
            <div className='RecipeInfo-top'>
              <div className='cook-time'>
                <FontAwesomeIcon icon={faFireBurner} className='FireBurner' />
                <p>
                  <span>Cook Time</span>
                  <span><span>{recipeInfo.readyInMinutes}</span>MINS</span>
                </p>
              </div>
              <div className='serving'>
                <FontAwesomeIcon icon={faPerson} className='Person' />
                <p>
                  <span>SERVING</span>
                  <span><span>{recipeInfo.servings}</span>Persons</span>
                </p>
              </div>
            </div>
            <h1>{recipeInfo.title}</h1>
            <p className='RecipeDescription'>{recipeDescription}</p>
            <ul className='dishTypes'>
              {recipeInfo.dishTypes.map((dishType, index) => (
                <li className='dishType' key={index}>{dishType}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='RecipeInfo-nutrients-container'>
          <ul className='RecipeInfo-nutrients'>
            {nutrients?.nutrients
              .filter(nutrient => nutrient.name === 'Fat' || nutrient.name === 'Calories' || nutrient.name === 'Carbohydrates' || nutrient.name === 'Protein')
              .map((nutrient, index) => (
                <li className='RecipeInfo-nutrient' key={{ index }}>
                  <span>{nutrient.name}:</span>
                  <span>{nutrient.amount} {nutrient.unit}</span>
                </li>
              ))}
          </ul>
          <div className='chart-container'>
            <Doughnut data={chartData} />
          </div>
        </div>

        <ul className='RecipeInfo-ingredients'>
          <h2>Ingredients:</h2>
          {recipeInfo.extendedIngredients.map((Ingredient, index) => (
            <li className='RecipeInfo-ingredient' key={index}>
              <img src={`https://spoonacular.com/cdn/ingredients_100x100/${Ingredient.image}`} alt='' />
              <h4>{Ingredient.name}</h4>
              <p>{Ingredient.measures.us.amount} {Ingredient.measures.us.unitLong}</p>
            </li>
          ))}
        </ul>

        <ul className='RecipeInfo-steps'>
          <h2>Recipe Steps</h2>
          {recipeInfo.analyzedInstructions.map((instructionObject, index) => (
            <li key={index} className='Instructions'>
              <h4>{instructionObject.name}</h4>
              {instructionObject.steps.map((step, stepIndex) => (
                <li className='RecipeInfo-step' key={stepIndex}>
                  <span>Step {stepIndex + 1}</span>
                  <p>{step.step}</p>
                </li>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div className='Footer'>
        <Footer />
      </div>
    </div>
  );
}

export default RecipeInfo;
