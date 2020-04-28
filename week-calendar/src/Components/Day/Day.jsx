import React, { Component } from 'react';
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
        timeBlocks.push(<TimeBlock title='Title' startTime={timeArray[ndx]} endTime={timeArray[ndx + 1]} />);
    }
    return timeBlocks;
}

class Day extends Component{ 
    state = {
        timeBlocks: generateTimeBlocks(800, 2000),
    };

    addTimeBlock = (title, startTime, endTime) => {
        let updatedTimeBlocks=this.state.timeBlocks;
        updatedTimeBlocks.push(<TimeBlock title={title} startTime={startTime} endTime={endTime}/>);
        this.setState({timeBlocks:updatedTimeBlocks});
    };
    
    render = () => {
        return(
            <div className = 'day-container'>
                {this.state.timeBlocks}
         </div>
    )};
};

export default Day;