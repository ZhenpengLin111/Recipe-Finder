// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ color: 'white', backgroundColor: '#141010', padding: '10px', textAlign: 'center', position: 'relative', bottom: 0, width: '100%', display:'flex', flexDirection:'column', alignItems:'center',}}>
      <p>&copy; 2023 <span style={{color:'blanchedalmond'}}>Recipe Finder</span>. All rights reserved.</p>
      <div className='underline' style={{position:'relative', height:'2px', width:'60%', background:'gray', marginBottom: '10px'}}></div>
    </footer>
  );
};

export default Footer;
