import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button';
import './Header.css';
import 'react-datepicker/dist/react-datepicker.css';

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
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange} 
                    />
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