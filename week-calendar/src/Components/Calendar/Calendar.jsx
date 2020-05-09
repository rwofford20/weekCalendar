import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';
import { cloneElement } from 'react';

class Calendar extends Component{
     //Constructor to set the state of the Calendar component
     constructor(props) {
          super(props);
          //Array containing all of the default time blocks
          let defaultTimeBlocksForDays = [];
          //Generate 12 default TimeBlocks for each day
          for (let dayIndex = 0; dayIndex < this.weekdays.length; dayIndex++) {
               const defaultBlocks = this.generateTimeBlocks(this.defaultDayStartTime, this.defaultDayEndTime)
               defaultTimeBlocksForDays.push(defaultBlocks);
          }
          //Set the state using the default time blocks generated above and generate 5 days
          this.state = {
               timeBlocksForDays: defaultTimeBlocksForDays,
               days: this.generateDays(5)
          };

     }

     weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
     defaultDayStartTime = 800;
     defaultDayEndTime = 2000;

     //Function to generate a Day component 
     //Used in the Calendar constructor
     //Input is the number of days to be created
     //Output is is a Day component with 12 default time blocks
     generateDays = (numDays) => {
          
          let days = [];
          for (let ndx = 0; ndx < numDays; ndx ++) {
               let timeBlocks = this.generateTimeBlocks(800, 2000);
               days.push(<Day timeBlocks={timeBlocks} key={this.weekdays[ndx % 5]} id={this.weekdays[ndx % 5]} />);
          }
          return days;
     };

     //Function to convert integer time values to a string and add a leading zero if necessary
     //Used in generateTimes function
     //Input is an integer value
     //Output is the above integer value converted to a string
     convertTimeToString = (intTime) => {
          let timeString = intTime.toString();
          if (intTime < 1000) {
              timeString = '0' + timeString;
          }
          return timeString;
      };
      
      //Function to generate start and end times for a time block
      //Used in generateTimeBlocks function
      //Input is an integer start time and end time
      //Output is an array of string start and end times
      generateTimes = (startTime, endTime) => {
          let timeArray = Array((endTime / 100) - (startTime / 100) + 1).fill().map((_, ndx) => startTime + 100 * ndx );
          timeArray = timeArray.map((intTime, ndx) => this.convertTimeToString(intTime));
          return timeArray;
      };
      
      //Function to generate default time blocks for a Day component
      //Used in the Calendar constructor and the generateDays function
      //Input is a start and end time
      //Output is an array of default time blocks with start and end times that increase by the hour
      generateTimeBlocks = (startTime, endTime) => {
          const timeArray = this.generateTimes(startTime, endTime);
          let timeBlocks = [];
          for (let ndx = 0; ndx < timeArray.length - 1; ndx++) {
               //Do not reset the key anywhere else in the code!
              timeBlocks.push(<TimeBlock title='Title' startTime={timeArray[ndx]} endTime={timeArray[ndx + 1]} key={ndx} id={ndx} availableTime={true}/>);
          }
          return timeBlocks;
      };

      //Function that adds a specific time block to a Day component
      //Currently used in the return statement of Calendar.jsx
      //Input is the title, start time, end time, and day for a time block that is to be added to a day
      //Output is that time block added to the pre-existing array of time blocks for that day
      addTimeBlock = (title, startTime, endTime, dayIndex, availableTime=false) => {
          let everything=this.state.timeBlocksForDays;
          let timeBlocksToUpdate = everything[dayIndex];
          let arrayLength = timeBlocksToUpdate.length; 
          // TODO: Update key generation for when data is passed in from the database.
          let key = title+startTime+endTime;
          const newTimeBlock = <TimeBlock title={title} startTime={startTime} endTime={endTime} key={key} id={key} availableTime={availableTime}/>;
          console.log('Adding a time block starting at ' + newTimeBlock.props.startTime + ' with availableTime set to ' + newTimeBlock.props.availableTime);
          this.setState( state => {
               // Update the TimeBlock array in state
               const timeBlocksForDays = state.timeBlocksForDays.map((timeBlockList, ndx) => {
                    if (dayIndex === ndx) {
                         // Add the new time block to the correct list
                         let foo = 0;
                         //console.log('TimeBlockList 11: ' + timeBlockList[11].props.startTime);
                         // Walk the list to get the index for insertion.
                         while(parseInt(timeBlockList[foo].props.startTime) < parseInt(newTimeBlock.props.startTime)) {
                              foo++;
                              //console.log('foo: ' + foo + 'TimeBlockList foo: ' + timeBlockList[foo].props.startTime) ;
                         }
                         //console.log('While loop terminated');
                         const left = timeBlockList.slice(0, foo);
                         const right = timeBlockList.slice(foo);
                         
                         let longerList = left.concat(newTimeBlock,right); 
                         //console.log('Built longerList');

                         // time block has been inserted
                         // If the timeblock is not the first thing in the list, update its predecessor
                         if (foo > 0) {
                              let previousTimeBlock = longerList[foo -1];
                              //if the start times is less than the previous end time, set the previous end time to the current start time 
                              if (previousTimeBlock.props.availableTime && parseInt(newTimeBlock.props.startTime) < parseInt(previousTimeBlock.props.endTime)){
                                   //previousTimeBlock.props.endTime = newTimeBlock.props.startTime;
                                   longerList[foo-1] = cloneElement(previousTimeBlock, {endTime: newTimeBlock.props.startTime});
                                   //console.log('Cloned element with endTime: ' + longerList[foo-1].props.endTime);
                              }
                         }
                         // If the new timeblock is not the last thing in the list, update its successor(s)
                         let nextTimeBlock
                         if (foo < longerList.length - 1) {
                              //console.log('Checking the next time block');
                              nextTimeBlock = longerList[foo + 1];
                              while (foo < (longerList.length - 1) && (parseInt(newTimeBlock.props.endTime) > parseInt(nextTimeBlock.props.startTime))) {                                   
                                   // If the new time block completely subsumes a successor, destroy the successor.
                                   if (nextTimeBlock.props.availableTime && parseInt(newTimeBlock.props.endTime) >= parseInt(nextTimeBlock.props.endTime)) {
                                        longerList.splice(foo+1, 1);
                                        //console.log('Removed element consumed by the time block from ' + newTimeBlock.props.startTime + 'to' + newTimeBlock.props.endTime);
                                   } 
                                   // Otherwise, there is overlap, so adjust the default block's start time to avoid collision.
                                   else if (nextTimeBlock.props.availableTime){
                                        longerList[foo+1] = cloneElement(nextTimeBlock, {startTime: newTimeBlock.props.endTime});
                                        //console.log('Cloned element with startTime: ' + longerList[foo+1].props.startTime);
                                        foo++; 
                                   } else {
                                        foo++;
                                   }
                                   // TODO: refactor to improve robustness
                                   // There is no guarantee that foo + 1 is a valid index
                                   // This code currently depends on the while condition to prevent indexing errors.
                                   nextTimeBlock = longerList[foo + 1];
                              }
                         }
                         //console.log('about to return longerList');
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

     deleteTimeBlock = (timeBlockID, dayID) => {
          console.log('Number of days: ' + this.state.timeBlocksForDays.length);
          let dayIndex = 0;
          while (this.state.days[dayIndex].props.id != dayID) {
               console.log('ID: ' + this.state.days[dayIndex].props.id + ' Day ID: ' + dayID);
               dayIndex++;
               //TODO: Handle situation where dayIndex >= 5
          };
          console.log('ID: ' + this.state.days[dayIndex].props.id + ' Day ID: ' + dayID);
          console.log('Day index: ' + dayIndex);
          //const day = this.state.days[dayIndex];
          this.setState((state) => { 
               const timeBlocksForDays = state.timeBlocksForDays.map((timeBlockList, ndx) => {
                    console.log('dayIndex: ' + dayIndex + ' NDX: ' + ndx);
                    if (dayIndex === ndx){
                         let blockIndex = 0;
                         console.log('TimeBlock list: ' + timeBlockList[blockIndex].props.id + 'NDX: ' + ndx);
                         while (timeBlockList[blockIndex].props.id != timeBlockID){
                              console.log('TimeBlockListID: ' + timeBlockList[blockIndex].props.id + ' timeBlockID: ' + timeBlockID);
                              blockIndex++;
                              console.log('block index' + blockIndex);
                              //TODO: Verify blockIndex is within bounds
                         }
                         // let longerlist = timeBlockList;
                         // longerlist.splice(blockIndex, 1);
                         // return longerlist;
                         console.log('about to return array with deleted time block');
                         return timeBlockList.splice(blockIndex, 1);
                    }
                    else {
                         return timeBlockList; 
                    }
               });
               return {timeBlocksForDays, days};
          });
     };

     render = () => {
          
          //Originally returns a default calendar
          //Adds a meeting to a specified when the 'Add a meeting!' button is clicked
          return (
                    <div className = 'calendar-container'>
                         {this.state.days}
                    </div>
                    /* <div onClick={() => this.addTimeBlock('Ron Swanson', '1230', '1430', 1)} >
                         <p>
                              Add a meeting!
                         </p>
                    </div>   */
          );
     };
}

export default Calendar;
