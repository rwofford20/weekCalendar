import React, { Component } from 'react';
import {DatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Header.css';

class Header extends Component{
    constructor(props) {
        super(props);
        this.dummy = "Header dummy value";
        this.state = {
            anchorElement: null,
            date: new Date(),
            menuActive: false
        };
        this.handleDate = this.handleDate.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMenuAddMeeting = this.handleMenuAddMeeting.bind(this);
    }

    handleDate(date) {
        this.setState({date: date});
    }

    handleMenuClick(e) {
        this.setState({anchorElement: e.currentTarget});
    }

    handleMenuClose() {
        this.setState({anchorElement: null});
    }

    handleMenuAddMeeting() {
        this.handleMenuClose();
        this.props.displayMeetingCreator();
    }

    render() {
        return (
            <div className='header-container'>
                <div className='header-title-container'>
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={this.handleMenuClick}
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon=""
                    >
                        {this.props.title}
                    </Button>
                    <Menu
                        id='main-menu'
                        anchorEl={this.state.anchorElement}
                        keepMounted
                        open={Boolean(this.state.anchorElement)}
                        onClose={this.handleMenuClose}
                    >
                        <MenuItem onClick={this.handleMenuClose}>Upload Schedule</MenuItem>
                        <MenuItem onClick={this.handleMenuAddMeeting}>Add Meeting</MenuItem>
                        <MenuItem onClick={this.handleMenuClose}>Generate Meetings</MenuItem>
                        <MenuItem onClick={this.handleMenuClose}>Login</MenuItem>
                    </Menu>
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