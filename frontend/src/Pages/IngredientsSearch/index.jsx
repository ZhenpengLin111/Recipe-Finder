import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss'
import pic23 from "../../assets/pic23.jpg";
import { Helmet } from 'react-helmet';
import Footer from '../../Component/Footer';
import { fetchRecipesByIngredientsAPI } from '../../apis/recipes';

const IngredientsSearch = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate()

    function showResults() {
        const Results = document.querySelector('.Results');
        Results.classList.add('show');
    }

    function closeResults() {
        const Results = document.querySelector('.Results');
        Results.classList.remove('show');
    }

    const handleSearch = async () => {
        const token = sessionStorage.getItem('User')
        if (!token) {
            alert('Please Login')
            navigate('/landing')
            return
        }
        if (ingredients) {
            try {
                const res = await fetchRecipesByIngredientsAPI(ingredients)
                setRecipes(res.data);
                showResults();
            } catch (error) {
                setError('Failed to fetch recipes. Please try again later.');
            } finally {
                setLoading(false);
            }

        } else {
            const notification = document.querySelector("#notification");
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    };

    return (
        <div className='Ingredients'>
            <Helmet>
                <title>IngredientsSearch | Recipe Finder</title>
            </Helmet>
            <div className='Ingredients-Search-Content'>
                <img src={pic23} alt='' />
                <div className='Search-top'>
                    <h1>Search Recipes by Ingredients</h1>
                    <div className='Ingredients-SearchBar'>
                        <input
                            type="text"
                            placeholder="Enter ingredients separated by commas..."
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <button onClick={() => { handleSearch(); }}>Search</button>
                    </div>
                </div>
            </div>

            <div className='Results'>
                <h1>Search Results:</h1>
                <span className='close' onClick={closeResults}><i>&times;</i></span>
                <div className='recipe-container'>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {recipes.map((recipe) => (
                        <Link key={recipe.id} to={`/recipe-info/${recipe.id}`} className="recipe-item">
                            <div className='recipe-img'>
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                            <h2>{recipe.title}</h2>
                            <ul className='missedIngredients'>
                                <h4>Missed Ingredients:</h4>
                                <div className='missedIngredients-list'>
                                    {recipe.missedIngredients.map((missedIngredient, index) => (
                                        <li className='missedIngredient' key={index}>{missedIngredient.name}</li>
                                    ))}
                                </div>

                            </ul>
                        </Link>
                    ))}
                </div>
            </div>
            <div id='notification' className='hidden'>
                <div className='notification-text'>Please Enter Ingredient</div>
            </div>
            <div className='Footer'>
                <Footer />
            </div>
        </div>
    );
};

export default IngredientsSearch;
