import React, { Component } from 'react';
import {DatePicker} from '@material-ui/pickers';
import Button from '../Button/Button';
import './Header.css';

class Header extends Component{
    constructor(props) {
        super(props);
        this.dummy = "Header dummy value";
        this.state = {startDate: new Date()};
    }

    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    render() {
        return (
            <div className='header-container'>
                <div className='header-title-container'>
                    {this.props.title}  
                </div>
                <div className='date-picker-container'>
                    <DatePicker></DatePicker>
                </div>
                <div className='header-add-meeting-button-container'>
                    <Button 
                        onClick={this.props.displayMeetingCreator}
                        title='Add Meeting'
                    />
                </div>
            </div>
        );
    }
}

export default Header;
 
//Date picker
//Group picker
//Hamburger menu