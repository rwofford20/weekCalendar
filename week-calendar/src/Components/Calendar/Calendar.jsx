import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';

class Calendar extends Component{
     
     constructor(props) {
          super(props);
          let defaultTimeBlocksForDays = [];
          for (let dayIndex = 0; dayIndex < this.weekdays.length; dayIndex++) {
               const defaultBlocks = this.generateTimeBlocks(this.defaultDayStartTime, this.defaultDayEndTime)
               defaultTimeBlocksForDays.push(defaultBlocks);
          }
          this.state = {
               timeBlocksForDays: defaultTimeBlocksForDays,
               days: this.generateDays(5)
          };

     }

     weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
     defaultDayStartTime = 800;
     defaultDayEndTime = 2000;

     generateDays = (numDays) => {
          
          let days = [];
          for (let ndx = 0; ndx < numDays; ndx ++) {
               let timeBlocks = this.generateTimeBlocks(800, 2000);
               days.push(<Day timeBlocks={timeBlocks} key={this.weekdays[ndx % 5]} />);
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
          let everything=this.state.timeBlocksForDays;
          let timeBlocksToUpdate = everything[dayIndex];
          let arrayLength = timeBlocksToUpdate.length; 
          // TODO: Update key generation. If we ever remove a time block we run the risk of duplicate keys
          const newTimeBlock = <TimeBlock title={title} startTime={startTime} endTime={endTime} key={arrayLength}/>;
          this.setState( state => {
               // Update the TimeBlock array in state
               const timeBlocksForDays = state.timeBlocksForDays.map((timeBlockList, ndx) => {
                    if (dayIndex === ndx) {
                         // Add the new time block to the correct list
                         let longerList = timeBlockList.concat(newTimeBlock);
                         // sort the list based on start times
                         longerList = longerList.sort((x, y) => (x.props.startTime > y.props.startTime) ? 1 : -1);
                         return longerList; 
                    }  else {
                         return timeBlockList;
                    }
               });
               // Using the updated TimeBlock array, update the day array in state.
               const days = state.days.map( (day, ndx) => {
                    if (dayIndex === ndx) {
                         const newDay = <Day timeBlocks={timeBlocksForDays[dayIndex]} key={day.key} />
                         return newDay;
                    }
                    else {
                         return day;
                    }
               });
               //console.log('Just prior to return from setState days[' + dayIndex + '] has ' + days[dayIndex].props.timeBlocks.length + ' TimeBlocks.');
               return {timeBlocksForDays, days: days};
          });
      };

     render = () => {
          
          return (
               <div className = 'calendar-container'>
                    {this.state.days}
               </div>
               /* <div onClick={() => this.addTimeBlock('Ron Swanson', '1800', '1900', 1)} >
                    <p>
                         Add a day!
                    </p>
               </div> */
          );
     };
}

export default Calendar;
