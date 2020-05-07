import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';
import { cloneElement } from 'react';

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
                         //let longerList = timeBlockList.concat(newTimeBlock);
                         // sort the list based on start times
                         //longerList = longerList.sort((x, y) => (x.props.startTime > y.props.startTime) ? 1 : -1);
                         //edit time blocks surrounding a new time block that has been inserted
                         let foo = 0;
                         //console.log('TimeBlockList 11: ' + timeBlockList[11].props.startTime);
                         while(parseInt(timeBlockList[foo].props.startTime) < parseInt(newTimeBlock.props.startTime)) {
                              foo++;
                              console.log('foo: ' + foo + 'TimeBlockList foo: ' + timeBlockList[foo].props.startTime) ;
                         }
                         console.log('While loop terminated');
                         const left = timeBlockList.slice(0, foo);
                         const right = timeBlockList.slice(foo);
                         
                         let longerList = left.concat(newTimeBlock,right); 
                         console.log('Built longerList');

                         // time block has been inserted
                         // If the timeblock is not the first thing in the list, update its predecessor
                         if (foo > 0){
                              let previousTimeBlock = longerList[foo -1];
                              //if the start times is less than the previous end time, set the previous end time to the current start time
                              // TODO: Handle collisions if the predecessor is not a default block 
                              if (parseInt(newTimeBlock.props.startTime) < parseInt(previousTimeBlock.props.endTime)){
                                   //previousTimeBlock.props.endTime = newTimeBlock.props.startTime;
                                   longerList[foo-1] = cloneElement(previousTimeBlock, {endTime: newTimeBlock.props.startTime});
                                   console.log('Cloned element with endTime: ' + longerList[foo-1].props.endTime);
                              }
                         }
                         // If the new timeblock is not the last thing in the list, update its successor(s)
                         let nextTimeBlock
                         if (foo < longerList.length - 1) {
                              console.log('Checking the next time block');
                              nextTimeBlock = longerList[foo + 1];
                              while (foo < (longerList.length - 1) && (parseInt(newTimeBlock.props.endTime) > parseInt(nextTimeBlock.props.startTime))) {                                   
                                   // If the new time block completely subsumes a successor, destroy the successor.
                                   // TODO: Handle collisions if the successor is not a default block.
                                   if (parseInt(newTimeBlock.props.endTime) >= parseInt(nextTimeBlock.props.endTime)) {
                                        longerList.splice(foo+1, 1);
                                        console.log('Removed element consumed by the time block from ' + newTimeBlock.props.startTime + 'to' + newTimeBlock.props.endTime);
                                   } 
                                   // Otherwise, there is overlap, so adjust the default block's start time to avoid collision.
                                   // TODO: Handle collisions if the successor is not a default block.
                                   else {
                                        longerList[foo+1] = cloneElement(nextTimeBlock, {startTime: newTimeBlock.props.endTime});
                                        console.log('Cloned element with startTime: ' + longerList[foo+1].props.startTime);
                                        foo++; 
                                   }
                                   // TODO: refactor to improve robustness
                                   // There is no guarantee that foo + 1 is a valid index
                                   // This code currently depends on the while condition to prevent indexing errors.
                                   nextTimeBlock = longerList[foo + 1];
                              }
                         }
                         console.log('about to return longerList');
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
               console.log('Just prior to return from setState days[' + dayIndex + '] has ' + days[dayIndex].props.timeBlocks.length + ' TimeBlocks.');
               return {timeBlocksForDays, days: days};
          });
      };

     render = () => {
          
          return (
               <div>
                    <div className = 'calendar-container'>
                         {this.state.days}
                    </div>
                    <div onClick={() => this.addTimeBlock('Ron Swanson', '1230', '1430', 1)} >
                         <p>
                              Add a day!
                         </p>
                    </div>  
               </div>
          );
     };
}

export default Calendar;
