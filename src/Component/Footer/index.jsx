// Footer.js
import React from 'react';
import './index.scss'

const Footer = () => {
  return (
    <footer style={{ }}>
      <p>&copy; 2023 <span style={{color:'blanchedalmond'}}>Recipe Finder</span>. All rights reserved.</p>
      <div className='underline' style={{position:'relative', height:'2px', width:'60%', background:'gray', marginBottom: '10px'}}></div>
    </footer>
  );
};

export default Footer;
