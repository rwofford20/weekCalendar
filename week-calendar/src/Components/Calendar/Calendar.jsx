import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';

function generateDays(numDays) {
     const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
     let days = [];
     for (let ndx = 0; ndx < numDays; ndx ++) {
          days.push(<Day key={weekdays[ndx % 5]} />);
     }
     return days;
}

class Calendar extends Component{

     // addTimeBlock = (title, startTime, endTime) => {
     //      let updatedTimeBlocks=this.state.timeBlocks;
     //      updatedTimeBlocks.push(<TimeBlock title={title} startTime={startTime} endTime={endTime}/>);
     //      this.setState({timeBlocks:updatedTimeBlocks});
     //  };

     constructor(props) {
          super(props);
          this.state = {days: generateDays(5)};
     }

     render = () => {

          return (
          <div className = 'calendar-container'>
               {this.state.days}
          </div>);
     };
}

export default Calendar;
