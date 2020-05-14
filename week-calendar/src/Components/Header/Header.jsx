import React from 'react';
import './Header.css';

const Header = (props) => (
    <div className='header-container'>
        <div className='header-title-container'>
            {props.title}  
        </div>
        <div className='header-add-meeting-button-container'>
            <Button />
        </div>
    </div>
);

export default Header;
 
//Date picker
//Group picker
//Hamburger menu