import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import NutrientsSearch from './Pages/NutrientsSearch';
import IngredientsSearch from './Pages/IngredientsSearch';
import RecipeInfo from './Pages/RecipeInfo';
import Navbar from './Component/Navbar';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/NutrientsSearch' element={<NutrientsSearch />} />
          <Route path='/IngredientsSearch' element={<IngredientsSearch />} />
          <Route path='recipe-info/:id' element={<RecipeInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
