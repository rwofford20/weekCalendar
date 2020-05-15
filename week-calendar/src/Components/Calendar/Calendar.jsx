import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';
import { cloneElement } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
     defaultTimeBlockTitle = '';

     //Function to generate a Day component 
     //Used in the Calendar constructor
     //Input is the number of days to be created
     //Output is is a Day component with 12 default time blocks
     generateDays = (numDays) => {
          
          let days = [];
          for (let ndx = 0; ndx < numDays; ndx ++) {
               let timeBlocks = this.generateTimeBlocks(this.defaultDayStartTime, this.defaultDayEndTime);
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
      addTimeBlock = (title, startTime, endTime, dayID, availableTime=false) => {
          //let everything=this.state.timeBlocksForDays;
          //let timeBlocksToUpdate = everything[dayIndex];
          //let arrayLength = timeBlocksToUpdate.length; 
          // TODO: Update key generation for when data is passed in from the database.
          let key = title+startTime+endTime;
          const newTimeBlock = <TimeBlock title={title} startTime={startTime} endTime={endTime} key={key} id={key} availableTime={availableTime}/>;
          console.log('Adding a time block starting at ' + newTimeBlock.props.startTime + ' and ending at ' + newTimeBlock.props.endTime + 'on the day' + dayID + ' with availableTime set to ' + newTimeBlock.props.availableTime);
          let dayIndex = 0;
          while (this.state.days[dayIndex].props.id !== dayID) {
               dayIndex++;
               //TODO: Handle situation where dayIndex >= 5
          };
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
                         const newDay = <Day timeBlocks={timeBlocksForDays[dayIndex]} key={day.props.key} id={day.props.id} />
                         return newDay;
                    }
                    else {
                         return day;
                    }
               });
               //console.log('Just prior to return from setState days[' + dayIndex + '] has ' + days[dayIndex].props.timeBlocks.length + ' TimeBlocks.');
               return {timeBlocksForDays, days};
          });
      };

     // TODO: Need to consider what happens when multiple available time blocks are exposed by deleting a long meeting 
     deleteTimeBlock = (timeBlockID, dayID) => {
          console.log('Deleting Time Block');
          let dayIndex = 0;
          while (this.state.days[dayIndex].props.id !== dayID) {
               dayIndex++;
               //TODO: Handle situation where dayIndex >= 5
          };
          let blocksForSourceDay = this.state.timeBlocksForDays[dayIndex];

          //Find the right timeBlock
          let blockIndex = 0;
          while (blocksForSourceDay[blockIndex].props.id !== timeBlockID) {
               blockIndex++;
          };
          // console.log('This.state: ' + this.state);
          // console.log('Source day block index: ' + this.state.blocksForSourceDay);
          let sourceTimeBlock = blocksForSourceDay[blockIndex];

          let previousBlockEndTime;
          let nextBlockStartTime;

          let previousTimeBlock; 
          let nextTimeBlock;

          //Find the previous and next time block's information
          //If we are working with the first time block set the previous block's end time to 0800
          //If we are not working with the first time block, get the previous block's end time
          if (blockIndex === 0) {
               previousBlockEndTime = this.defaultDayStartTime;
               previousTimeBlock = null;
          }
          else {
               previousBlockEndTime = parseInt(blocksForSourceDay[blockIndex-1].props.endTime);
               previousTimeBlock = blocksForSourceDay[blockIndex-1];
          }

          //If we are working with the last time block set the previous block's end time to 2000
          //If we are not working with the first time block, get the next block's start time 
          if (blockIndex === blocksForSourceDay.length-1) {
               nextBlockStartTime = this.defaultDayEndTime;
               nextTimeBlock = null;
          }
          else {
               nextBlockStartTime = parseInt(blocksForSourceDay[blockIndex+1].props.startTime);
               nextTimeBlock = blocksForSourceDay[blockIndex+1];
          }

          let fillBlockStartTime = previousBlockEndTime;
          let fillBlockEndTime = nextBlockStartTime;
          //console.log('fillBlockstartTime: ' + fillBlockStartTime + 'fillBlockEndTime: ' + fillBlockEndTime);
          
          let fillBlockStartTimeMinutes = (fillBlockStartTime % 100);
          let fillBlockEndTimeMinutes = (fillBlockEndTime % 100);
          //console.log('fillBlockStartTimeMinutes: ' + fillBlockStartTimeMinutes + 'fillBlockEndTimeMinutes: ' + fillBlockEndTimeMinutes);

          let firstFillEndTime = Math.ceil(fillBlockStartTime/100)*100;
          let lastFillStartTime = Math.floor(fillBlockEndTime/100)*100;
          let fillBlockHours = lastFillStartTime - firstFillEndTime;
          // console.log('firstFillEndTime: ' + firstFillEndTime);
          // console.log('lastFillStartTime' + lastFillStartTime);
          // console.log('fillBlockHours' + fillBlockHours);

          let lastFillEndTime = firstFillEndTime + fillBlockHours + fillBlockEndTimeMinutes;
          //console.log('lastFillEndTime: ' + lastFillEndTime);

          //Create the blocks to fill the gap
          let timeBlocksToAdd = [];

          //Merge partial time blocks together if necessary
          let endFirstHalf = blockIndex;
          let startSecondHalf = blockIndex;
          if(previousTimeBlock != null && previousTimeBlock.props.availableTime && fillBlockStartTimeMinutes > 0) {
               console.log('merging first time block');
               endFirstHalf = blockIndex-1;
               timeBlocksToAdd.push(cloneElement(previousTimeBlock, {endTime: this.convertTimeToString(firstFillEndTime)}));
          }
          else if (fillBlockStartTimeMinutes > 0) {
               let fillStartTime = this.convertTimeToString(fillBlockStartTime);
               let fillEndTime = this.convertTimeToString(firstFillEndTime);
               //console.log('fillStartTime: ' + fillStartTime + 'fillEndTime: ' + fillEndTime);
               timeBlocksToAdd.push(<TimeBlock 
                    title = {this.defaultTimeBlockTitle} 
                    startTime = {fillStartTime}
                    endTime = {fillEndTime}
                    availableTime = {true}
                    id = {fillStartTime + fillEndTime}
                    key = {fillStartTime + fillEndTime}
                    />)
          }

          for (let ndx =0; ndx < fillBlockHours/100; ndx++) {
               let fillStartTime = this.convertTimeToString(firstFillEndTime + ndx*100);
               let fillEndTime = this.convertTimeToString(firstFillEndTime + (ndx+1)*100);
               //console.log('fillStartTime: ' + fillStartTime + 'fillEndTime: ' + fillEndTime);
               timeBlocksToAdd.push(<TimeBlock
                    title = {this.defaultTimeBlockTitle} 
                    startTime = {fillStartTime}
                    endTime = {fillEndTime}
                    availableTime = {true}
                    id = {fillStartTime + fillEndTime}
                    key = {fillStartTime + fillEndTime}                    
                    />)
          }

          if(nextTimeBlock != null && nextTimeBlock.props.availableTime && fillBlockEndTimeMinutes > 0) {
               console.log('merging last time block');
               startSecondHalf = blockIndex+1;
               timeBlocksToAdd.push(cloneElement(nextTimeBlock, {startTime: this.convertTimeToString(lastFillStartTime)}));
          }
          else if (fillBlockEndTimeMinutes > 0) {
               let fillStartTime = this.convertTimeToString(lastFillStartTime);
               let fillEndTime = this.convertTimeToString(lastFillEndTime); 
               //console.log('fillStartTime: ' + fillStartTime + 'fillEndTime: ' + fillEndTime);
               timeBlocksToAdd.push(<TimeBlock
                    title = {this.defaultTimeBlockTitle}
                    startTime = {fillStartTime}
                    endTime = {fillEndTime}
                    availableTime = {true}
                    id = {fillStartTime + fillEndTime}
                    key = {fillStartTime + fillEndTime}                   
                    />)
          }

          //Build a list with the new time blocks added in
          let previousBlocks = blocksForSourceDay.slice(0, endFirstHalf);
          let nextBlocks = blocksForSourceDay.slice(startSecondHalf+1);
          let updatedList = previousBlocks.concat(timeBlocksToAdd, nextBlocks);


          //Fill the spaces from which the time block is being deleted
          this.setState((state) => { 
               const timeBlocksForDays = state.timeBlocksForDays.map((timeBlockList, ndx) => {
                    if (dayIndex === ndx) {
                         return updatedList;
                    }
                    else {
                         return timeBlockList;
                    }
               });

               // Using the updated TimeBlock array, update the day array in state.
               const days = state.days.map( (day, ndx) => {
                    if (dayIndex === ndx) {
                         const newDay = <Day timeBlocks={timeBlocksForDays[dayIndex]} key={day.key} id={day.id}/>
                         return newDay;
                    }
                    else {
                         return day;
                    }
               });
               return {timeBlocksForDays, days};
          });
     };

     // Update an existing time block
     // If a parameter is ever an
     // TODO: Need to consider what happens when multiple available time blocks are exposed by shortening a long meeting
     badUpdateTimeBlock = (timeBlockID, dayID, newTitle='', newStartTime='', newEndTime='', availableTime = false) => {
          console.log('Update called with newStartTime = ' + newStartTime);
          //let dayIndex = 1;
          let dayIndex = 0;
          console.log('Update found ' + this.state.days.length + ' days');
          console.log('Day 0 has id ' + this.state.days[0].props.id);

          while (this.state.days[dayIndex].props.id !== dayID) {
               console.log('Looking for day ' + dayID + ' but found ' + this.state.days[dayIndex].props.id);
               dayIndex++;
               console.log('Incremented dayIndex to ' + dayIndex);
               //TODO: Handle situation where dayIndex >= 5
          };
          //console.log('Found day index of ' + dayIndex + ' for a dayID parameter of ' + dayID);
          this.setState((state) => { 
               //console.log("Setting state via updateTimeBlock");
               const timeBlocksForDays = state.timeBlocksForDays.map((timeBlockList, ndx) => {
                    //console.log('In updateTimeBlock: dayIndex: ' + dayIndex + ' NDX: ' + ndx);
                    if (dayIndex === ndx){
                         //console.log('updateTimeBlock found the right day: ' + dayIndex + ' = ' + ndx);
                         let blockIndex = 0;
                         while (timeBlockList[blockIndex].props.id !== timeBlockID){
                              console.log('In updateTimeBlock: TimeBlockList : ' + timeBlockList[blockIndex].props.id + ' parameter timeBlockID: ' + timeBlockID + ' block index: ' + blockIndex);
                              blockIndex++;
                              //TODO: Verify blockIndex is within bounds
                         }
                         //console.log('update found the right timeblock : ' + timeBlockList[blockIndex].props.id + ' parameter timeBlockID: ' + timeBlockID + ' block index: ' + blockIndex);
                         // Update the time block values
                         const oldTimeBlock = timeBlockList[blockIndex];
                         const oldBlockTitle = oldTimeBlock.props.title;
                         const newBlockTitle = newTitle.length > 0 ? newTitle : oldBlockTitle;
                         const oldBlockStartTime = oldTimeBlock.props.startTime;
                         const newBlockStartTime = newStartTime.length > 0 ? newStartTime : oldBlockStartTime;
                         const oldBlockEndTime = oldTimeBlock.props.endTime;
                         const newBlockEndTime = newEndTime.length > 0 ? newEndTime : oldBlockEndTime;
                         console.log('Update reports: OBST=' + oldBlockStartTime + ' NBST=' + newBlockStartTime);
                         const newTimeBlock = cloneElement(oldTimeBlock, 
                              {
                                   id:timeBlockID,
                                   title: newBlockTitle,
                                   startTime: newBlockStartTime,
                                   endTime: newBlockEndTime,
                                   availableTime: availableTime,
                                   key:timeBlockID
                              });

                         //Subtract start times to see if we need blocks before.
                         const intOldBlockStartTime = parseInt(oldBlockStartTime);
                         const intNewBlockStartTime = parseInt(newBlockStartTime);
                         const intOldBlockEndTime = parseInt(oldBlockEndTime);
                         const intNewBlockEndTime = parseInt(newBlockEndTime);
                         const startDelta = intNewBlockStartTime - intOldBlockStartTime;
                         console.log('Update reports: OBST=' + intOldBlockStartTime + ' NBST=' + intNewBlockStartTime);

                         // If the start time got later, create new free blocks to fill the space
                         let blocksToAdd = [];
                         if (startDelta > 0) {
                              console.log('Update: startDelta > 0. startDelta = ' + startDelta);
                              let partialHour = startDelta % 100;
                              let fullHourCount = Math.floor(startDelta / 100);
                              let hourCount = Math.ceil(startDelta / 100);
                              // If we are updating the first block
                              //   Then we just need to insert time blocks from the beginning of the day
                              if (blockIndex === 0) {
                                   console.log('Updating the first time block!');
                                   // Need the difference between the day start time (same as old start time) and the new start time
                                   // Create block starting at 800
                                   //   If fullHourCount === 0, this is the only one we need, and it runs from OST to NST
                                   //   Else, it runs from OST to Math.floor(OST / 100) + 100
                                   // Create fullHourCount additional blocks
                                   const firstTimeBlock = <TimeBlock 
                                        startTime={this.convertTimeToString(this.defaultDayStartTime)} 
                                        endTime={newBlockStartTime} 
                                        id={blockIndex} 
                                        title={this.defaultTimeBlockTitle}
                                        availableTime={true}  
                                        key={blockIndex} />
                                   blocksToAdd.push(firstTimeBlock);
                                   blocksToAdd.push(newTimeBlock);
                              }
                              // Otherwise we are not updating the first block
                              //   Then we need to update the previous block
                              //   AND add new time blocks to fill gaps
                              else {}
                              console.log('Update: blocksToAdd[0] has start time ' + blocksToAdd[0].props.startTime);
                              if (partialHour > 0) {
                                   // Create a new time block beginning at the old start time and continuing to the nearest hour
                              }

                         // Otherwise if the start time got earlier, remove or reduce free blocks to make room
                         } else if (startDelta < 0) {

                         }
                         
                         //if (endDelta > 0)
                         //if (endDelta < 0)

                         // if (startDelta === 0 && endDelta === 0){

                         // }


                         // Subtract end times to see if we need blocks after.
                         const endDelta = newBlockEndTime - oldBlockEndTime;

                         // Consume old blocks

                         //Get everything up to the block we want to update
                         const left = timeBlockList.slice(0, blockIndex);
                         // Get everything after the block we want to update
                         const right = timeBlockList.slice(blockIndex+1);
                         
                         const updatedList = left.concat(blocksToAdd, right);
                         console.log('The updated time block has title=' + updatedList[1].props.title);
                         return updatedList;
                    }
                    else {
                         return timeBlockList; 
                    }
               });
               // Using the updated TimeBlock array, update the day array in state.
               const days = state.days.map( (day, ndx) => {
                    if (dayIndex === ndx) {
                         const id = day.props.id;
                         console.log('Copying id ' + id);
                         const newDay = cloneElement(day, {timeBlocks: timeBlocksForDays[dayIndex]}) 
                         return newDay;
                    }
                    else {
                         return day;
                    }
               });
               console.log('the updated block in timeBlocksForDays has title = ' + timeBlocksForDays[dayIndex][1].props.title);
               console.log('the updated block in days has title = ' + days[dayIndex].props.timeBlocks[1].props.title);
               return {timeBlocksForDays, days};
          });
     };

     updateTimeBlock = (timeBlockID, sourceDayID, newDayID='', newTitle='', newStartTime='', newEndTime='', availableTime = false) => {
          //Find the right day
          let dayIndex = 0;
          while (this.state.days[dayIndex].props.id !== sourceDayID) {
               dayIndex++;
               //TODO: Handle situation where dayIndex >= 5
          };
          let blocksForSourceDay = this.state.timeBlocksForDays[dayIndex];

          //Find the right timeBlock
          let blockIndex = 0;
          console.log('timeBlockID: ' + timeBlockID);
          while (blocksForSourceDay[blockIndex].props.id !== timeBlockID){
               blockIndex++;
          }
          let sourceTimeBlock = blocksForSourceDay[blockIndex];

          //Store the information of the source time block
          const sourceTimeBlockID = sourceTimeBlock.props.timeBlockID;
          const sourceTitle = sourceTimeBlock.props.title;
          const sourceStartTime = sourceTimeBlock.props.startTime;
          const sourceEndTime = sourceTimeBlock.props.endTime; 
          const sourceAvailableTime = sourceTimeBlock.props.availableTime; 

          //Delete the source time block
          this.deleteTimeBlock(timeBlockID, sourceDayID);

          // Update the time block values
          const destinationTitle = newTitle.length > 0 ? newTitle : sourceTitle;
          const destinationStartTime = newStartTime.length > 0 ? newStartTime : sourceStartTime;
          const destinationEndTime = newEndTime.length > 0 ? newEndTime : sourceEndTime;
          const destinationDayID = newDayID.length > 0? newDayID: sourceDayID;

          //Add a new time block with updated information
          console.log('destinationTitle: ' + destinationTitle + 'destinationStartTime: ' + destinationStartTime + 'destinationEndTime: ' + destinationEndTime
               + 'destinationDayID: ' + destinationDayID + 'availableTime: ' + availableTime);
          this.addTimeBlock(destinationTitle, destinationStartTime, destinationEndTime, destinationDayID, availableTime);
          console.log('timeBlockId2: ' + timeBlockID);

     };
     

     render = () => {
          
          //Originally returns a default calendar
          //Adds a meeting to a specified when the 'Add a meeting!' button is clicked
          return (
               //<div>
                    <div className = 'calendar-container'>
                         {this.state.days}
                    </div>
                    /*
                    <div onClick={() => this.addTimeBlock('Ron Swanson', '1130', '1230', 'tuesday')} >
                         <p>
                              Add a meeting!
                         </p>
                    </div>
                    <div onClick={() => this.updateTimeBlock('Ron Swanson11301230', 'tuesday', 'tuesday', 'Updated Ron', '1300', '1430', false)}>
                         Update Ron's meeting
                    </div>
                    <div onClick={() => this.deleteTimeBlock('Ron Swanson11301230', 'tuesday')}>
                         Delete Ron's meeting
                    </div>
                    */
               //</div>
          );
     };
}

export default Calendar;
