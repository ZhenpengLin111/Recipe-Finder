import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/Recipe-finder-icon.png";


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);
    
    
    useEffect(() => {
        const aboutElement = document.querySelector('.About');
        const handleScroll = () => {
            
            console.log('Scrolling...');
            if (window.scrollY > 50) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

    useEffect(() => {
        const navbar = document.querySelector('.Navbar');
        console.log(isTransparent);
        // Add any side effect logic you want to perform after isTransparent is updated
    }, [isTransparent]); 


    const handleLinkClick = () => {
        setMenuOpen(false);
    };
    return (
        <nav className={`Navbar ${isTransparent ? '' : 'NotTransparent'}`}>
            <div className="nav1">
                <div className='left-side'>
                    <FontAwesomeIcon icon={faUtensils} className='Utensils'/>
                    <span>Recipe Finder</span>
                </div>
            </div>
            <input type='checkbox' className='menu-btn' id='menu-btn' checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
            <label htmlFor='menu-btn' className='menu-icon'>
                <span className='nav-icon'></span>
            </label>
            <ul className='nav-2'>
                <li><Link to="/" onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/NutrientsSearch" onClick={handleLinkClick}>Search by Nutrients</Link></li>
                <li><Link to="/IngredientsSearch" onClick={handleLinkClick}>Search by Ingredients</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;