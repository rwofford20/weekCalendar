import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeBlock from '../TimeBlock/TimeBlock';
import equal from 'fast-deep-equal';
import './Day.css';

class Day extends Component{ 
    constructor(props) {
        super(props);
        //this.state = {timeBlocks: generateTimeBlocks(800, 2000)};    
    };
    
    render = () => {
        return(
            <div className = 'day-container'>
                {this.props.timeBlocks}
         </div>
    )};
};

export default Day;