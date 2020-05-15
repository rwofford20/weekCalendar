import React, { Component } from 'react';
import {DatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import './Header.css';

class Header extends Component{
    constructor(props) {
        super(props);
        this.dummy = "Header dummy value";
        this.state = {date: new Date()};
        this.handleDate = this.handleDate.bind(this);
    }

    handleDate(date) {
        this.setState({date: date});
    }

    render() {
        return (
            <div className='header-container'>
                <div className='header-title-container'>
                    {this.props.title}  
                </div>
                <div className='date-picker-container'>
                    <DatePicker onChange={this.handleDate} value ={this.state.date} />   
                </div>
                <div className='header-add-meeting-button-container'>
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon=""
                        onClick={this.props.displayMeetingCreator}
                        title='Add Meeting'
                    >
                    + Add Meeting
                     </Button>
                </div>
            </div>
        );
    }
}

export default Header;