import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Day.css';

function convertTimeToString(intTime) {
    let timeString = intTime.toString();
    if (intTime < 1000) {
        timeString = '0' + timeString;
    }
    return timeString;
}

function generateTimes(startTime, endTime) {
    let timeArray = Array((endTime / 100) - (startTime / 100) + 1).fill().map((_, ndx) => startTime + 100 * ndx );
    timeArray = timeArray.map((intTime, ndx) => convertTimeToString(intTime));
    return timeArray;
}

function generateTimeBlocks(startTime, endTime) {
    const timeArray = generateTimes(startTime, endTime);
    let timeBlocks = [];
    for (let ndx = 0; ndx < timeArray.length - 1; ndx++) {
        timeBlocks.push(<TimeBlock title='Title' startTime={timeArray[ndx]} endTime={timeArray[ndx + 1]} key={timeArray[ndx]}/>);
    }
    return timeBlocks;
}

class Day extends Component{ 
    constructor(props) {
        super(props);
        this.state = {timeBlocks: generateTimeBlocks(800, 2000)};
        
    };
    
    render = () => {
        return(
            <div className = 'day-container'>
                {this.state.timeBlocks}
         </div>
    )};
};

Day.propTypes = {addTimeBlock:PropTypes.func.isRequired};

export default Day;