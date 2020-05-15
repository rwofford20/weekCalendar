import React, { Component } from 'react';
import Button from '../Button/Button'
import './Header.css';

class Header extends Component{
    constructor(props) {
        super(props);
        this.dummy = "Header dummy value";
    }

    render() {
        return (
            <div className='header-container'>
                <div className='header-title-container'>
                    {this.props.title}  
                </div>
                <div className='header-add-meeting-button-container'>
                    <Button onClick={this.props.displayMeetingCreator}/>
                </div>
            </div>
        );
    }
}

export default Header;
 
//Date picker
//Group picker
//Hamburger menu