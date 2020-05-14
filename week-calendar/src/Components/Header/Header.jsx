import React from 'react';
import Button from '../Button/Button'
import './Header.css';


function Header(props) {
    const displayMeetingCreator = () => {
        console.log('Called displayMeetingCreator from Header')
    }

    return (
        <div className='header-container'>
        <div className='header-title-container'>
            {props.title}  
        </div>
        <div className='header-add-meeting-button-container'>
            <Button onClick={displayMeetingCreator}/>
        </div>
        </div>
    );
}

export default Header;
 
//Date picker
//Group picker
//Hamburger menu