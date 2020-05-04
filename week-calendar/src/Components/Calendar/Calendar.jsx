import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';

class Calendar extends Component{

     constructor(props) {
          super(props);
          this.state = {days: this.generateDays(5)};
     }

     generateDays = (numDays) => {
          const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
          let days = [];
          for (let ndx = 0; ndx < numDays; ndx ++) {
               let timeBlocks = this.generateTimeBlocks(800, 2000);
               days.push(<Day timeBlocks={timeBlocks} key={weekdays[ndx % 5]} />);
          }
          return days;
     };

     convertTimeToString = (intTime) => {
          let timeString = intTime.toString();
          if (intTime < 1000) {
              timeString = '0' + timeString;
          }
          return timeString;
      };
      
      generateTimes = (startTime, endTime) => {
          let timeArray = Array((endTime / 100) - (startTime / 100) + 1).fill().map((_, ndx) => startTime + 100 * ndx );
          timeArray = timeArray.map((intTime, ndx) => this.convertTimeToString(intTime));
          return timeArray;
      };
      
      generateTimeBlocks = (startTime, endTime) => {
          const timeArray = this.generateTimes(startTime, endTime);
          let timeBlocks = [];
          for (let ndx = 0; ndx < timeArray.length - 1; ndx++) {
              timeBlocks.push(<TimeBlock title='Title' startTime={timeArray[ndx]} endTime={timeArray[ndx + 1]} key={ndx}/>);
          }
          return timeBlocks;
      };

      addTimeBlock = (title, startTime, endTime, dayIndex) => {
          let updatedTimeBlocks=this.state.days[dayIndex].timeBlocks;
          let arrayLength = updatedTimeBlocks.length; 
          updatedTimeBlocks.push(<TimeBlock title={title} startTime={startTime} endTime={endTime} key={arrayLength}/>);
          this.setState({timeBlocks:updatedTimeBlocks});
      };

     render = () => {

          return (
          <div className = 'calendar-container'>
               {this.state.days}
          </div>);
     };
}

export default Calendar;
