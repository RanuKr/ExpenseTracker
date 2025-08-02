import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src="./src/assets/expenselogo.png" alt="logo" 
        className='w-14'/>
      </Link>
    </div>
  );
};

export default Logo;
