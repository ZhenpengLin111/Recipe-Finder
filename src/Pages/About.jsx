import "../Styles/About.css";
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Footer from "../Component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import pic5 from "../assets/pic5.jpg";
import pic6 from "../assets/pic6.jpg";
import pic7 from "../assets/pic7.jpg";
import pic8 from "../assets/pic8.jpg";
import pic9 from "../assets/pic9.jpg";
import pic10 from "../assets/pic10.jpg";
import pic11 from "../assets/pic11.jpg";
import pic12 from "../assets/pic12.jpg";
import pic13 from "../assets/pic13.jpg";
import pic14 from "../assets/pic14.jpg";
import pic15 from "../assets/pic15.jpg";
import pic16 from "../assets/pic16.jpg";
import pic17 from "../assets/pic17.jpg";
import pic18 from "../assets/pic18.jpg";
import pic19 from "../assets/pic19.jpg";
import pic20 from "../assets/pic20.jpg";
import pic21 from "../assets/pic21.jpg";


function About() {
    // Array for images
    const slide_track1_imgs = [pic1, pic2, pic3, pic4, pic5, pic6]
    const slide_track2_imgs = [pic7, pic8, pic9, pic10, pic11, pic12]

    // Visibilities of sections
    const [isSection1Visible, setIsSection1Visible] = useState(false);
    const [isSection2Visible, setIsSection2Visible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const nutrient_section = document.querySelector('.nutrient-section');
            if (nutrient_section) {
                const sectionTop = nutrient_section.getBoundingClientRect().top;
                setIsSection1Visible(sectionTop <= window.innerHeight / 2);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const ingredient_section = document.querySelector('.ingredient-section');
            if (ingredient_section) {
                const sectionTop = ingredient_section.getBoundingClientRect().top;
                setIsSection2Visible(sectionTop <= window.innerHeight / 2);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="About">
            <Helmet>
                <title>Recipe Finder</title>
            </Helmet>
            <div className="first-page">
                <div className="intro">
                    <h1>RecipeFinder: Your Culinary Companion</h1>
                    <p>Welcome to RecipeFinder, where culinary exploration meets smart,
                        personalized recipe recommendations. Whether you're aiming for a
                        health-conscious meal or have a specific set of ingredients on hand,
                        RecipeFinder is here to make your cooking journey delightful and hassle-free.
                    </p>
                    <div className="buttons">
                        <div className="button nutrient-search-button">
                            <a href="/NutrientsSearch">
                                <span>Find Recipes By Nutrients</span>
                            </a>
                        </div>
                        <div className="button ingredient-search-button">
                            <a href="/IngredientsSearch">
                                <span>Find Recipes By Ingredients</span>
                                <FontAwesomeIcon icon={faArrowRight} className="arrowRight" />
                            </a>
                        </div>
                    </div>

                </div>
                <div className="slider">
                    <div className="slide-track1">
                        {slide_track1_imgs.map((img, index) =>
                            <div className="slide" key={index}>
                                <img src={(img)} alt="" />
                            </div>)}
                        {slide_track1_imgs.map((img, index) =>
                            <div className="slide" key={index}>
                                <img src={(img)} alt="" />
                            </div>)}
                    </div>
                    <div className="slide-track2">
                        {slide_track2_imgs.map((img, index) =>
                            <div className="slide" key={index}>
                                <img src={img} alt="" />
                            </div>)
                        }
                        {slide_track2_imgs.map((img, index) =>
                            <div className="slide" key={index}>
                                <img src={img} alt="" />
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="second-page">
                <div className={`nutrient-section ${isSection1Visible ? 'fade-in' : ''}`}>
                    <div className={`nutrient-section-info ${isSection1Visible ? 'fade-in1' : ''}`}>
                        <h1>Nutrient-Focused Exploration:</h1>
                        <p>Looking to maintain a balanced diet? Specify your nutritional preferences,
                            and RecipeFinder will curate recipes that align with your dietary goals.
                        </p>
                    </div>
                    <div className="nutrient-section-photos">
                        <div className="photos-left">
                            <img src={pic15} alt="" className={`pic15 ${isSection1Visible ? 'fade-in2' : ''}`}></img>
                            <img src={pic14} alt="" className={`pic14 ${isSection1Visible ? 'fade-in3' : ''}`}></img>
                        </div>
                        <div className="photos-right">
                            <img src={pic13} alt="" className={`pic13 ${isSection1Visible ? 'fade-in4' : ''}`}></img>
                        </div>
                    </div>
                </div>
                <div className={`ingredient-section ${isSection2Visible ? 'fade-in-left' : ''}`}>
                    <div className={`ingredient-section-info ${isSection2Visible ? 'fade-in-top' : ''}`}>
                        <h1>Ingredient-Based Searching:</h1>
                        <p>Simply input the ingredients you have, and RecipeFinder will craft delectable recipes
                            tailored to your kitchen inventory.
                        </p>
                    </div>
                    <div className="IMAGES">
                        <img className="pic16" src={pic16} alt="" />
                        <img className="pic17" src={pic18} alt="" />
                        <img className="pic18" src={pic17} alt="" />
                        <img className="pic19" src={pic20} alt="" />
                        <img className="pic20" src={pic19} alt="" />
                        <img className="pic21" src={pic21} alt="" />
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default About;