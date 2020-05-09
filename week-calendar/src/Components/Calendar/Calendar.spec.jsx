import React from 'react';
import { mount, shallow } from 'enzyme';
import Calendar from './Calendar';

describe('Calendar', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calendar />));

    //Snapshot test
    it ('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    //Test to determine if Calendar.jsx renders 1 div
    it('should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    //Test to determine if Calendar.jsx render 5 Day components
    it('should render 5 days', () => {
        expect(wrapper.find('Day').length).toEqual(5);
    });

    //Test to determine if each Day has the correct ID that corresponds to a week day
    it('Each Day should have an ID corresponding to the day of the week', () => {
        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        wrapper = mount(<Calendar />);
        //Drill into the Day children of Calendar
        const dayList = wrapper.children('div.calendar-container').at(0).children('Day');
        //Compare the ID of each Day component to the elements of the weekdays array above
        for (let ndx = 0; ndx < dayList.length; ndx++) {
            expect(dayList.at(ndx).key()).toEqual(weekdays[ndx]);
        }
    });

    //Test to determine if the first Day component in Calendar renders 12 default TimeBlocks
    //This test will start failing when more TimeBlocks are added from the backend
    it('should render 12 time blocks', () => {
        wrapper = mount(<Calendar />);
        //Drill into the first Day child of Calendar
        let firstDay = wrapper.children('div.calendar-container').first().children('Day').first();
        //Check if this day has 12 TimeBlocks
        expect(firstDay.find('TimeBlock').length).toEqual(12);
    });

    //Test to determine if the first TimeBlock renders a default meeting time of 0800 - 0900
    it('should render the first time block with meeting time of 0800 - 0900 when no parameters are passed', () => {
        wrapper = mount(<Calendar />);
        //Drill into the time container of the first TimeBlock child of the first Day child of Calendar
        let firstDay = wrapper.children('.calendar-container').first().children('Day').first();
        const firstTimeBlock = firstDay.find('div.day-container').children('TimeBlock').at(0);
        //const firstActualTimeBlock = timeBlocks.get(0);
        //expect(firstActualTimeBlock.props.startTime).toEqual('0800');
        const timeBlockTimes = firstTimeBlock.find('.timeblock-time-container');
        expect(timeBlockTimes.text()).toEqual('0800 - 0900');
    });

    //Test to determine if the addTimeBlock function actually adds a TimeBlock in the Day component
    it('should add a time block', () => {
        wrapper = mount(<Calendar />);
        //Start at the first day (Monday)
        const dayIndex = 0;
        //Create an instance of the Calendar component
        //For more information on instance(): https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/instance.html
        let calendar = wrapper.instance();
        calendar.addTimeBlock('Meeting with Burt Macklin', '1200', '0100', dayIndex);
        //Get the state of the calendat on the day at dayIndex (a specific day)
        let firstDay = calendar.state.days[dayIndex];
        expect(firstDay.props.timeBlocks.length).toEqual(13);
        // We can't figure out how to run the test with Enzyme wrappers
        // The wrapper does not appear to update after we call addTimeBlock.
        //const firstDay = wrapper.children('.calendar-container').at(0).children('Day').at(dayIndex);
        //expect(firstDay.find('TimeBlock').length).toEqual(13);
     });

     //Test to determine if the TimeBlocks are order sequentieally based on their start times
     it('should order time blocks by start time', () => {
        wrapper = mount(<Calendar />);
        //Start at the first day (Monday)
        const dayIndex = 0;
        //Create an instance of the Calendar component
        let calendar = wrapper.instance();
        //Add 3 different time blocks to the same day with different titles and start and end times
        calendar.addTimeBlock('Meeting at JJs Diner', '0700', '0800', dayIndex);
        calendar.addTimeBlock('Meeting at Food and Stuff', '1230', '1330', dayIndex);
        calendar.addTimeBlock('Pick up Discount Meat', '2000', '2100', dayIndex);
        //Get the state of the calendar on a specific day
        const testDay = calendar.state.days[dayIndex]; 
        //Check that there are 15 TimeBlocks after the 3 TimeBlocks have been added
        expect(testDay.props.timeBlocks.length).toEqual(15);
        // Check each block in testDay to make sure the start times are increasing
        for (let ndx = 0; ndx < testDay.props.timeBlocks.length - 1; ndx ++) {
            const currentBlock = testDay.props.timeBlocks[ndx];
            const nextBlock = testDay.props.timeBlocks[ndx + 1];
            expect(parseInt(currentBlock.props.startTime)).toBeLessThanOrEqual(parseInt(nextBlock.props.startTime))
        }
     });

     //This test is going poorly right now, throwing an error about props being undefined in the code
     //Aside from the test, the portion of the code this is testing seems to be working correctly
     //Check that the end time of the previous TimeBlock equals the start time of the next TimeBlock
     it('should match the end time of the previous time block to the start time of the new time block', () => {
         wrapper = mount(<Calendar />);
         const dayIndex = 0;
         //Create an instance of the Calendar component and add 3 different time blocks to the same day
         let calendar = wrapper.instance();
         calendar.addTimeBlock('Meeting at Food and Stuff', '1230', '1330', dayIndex, true);
         calendar.addTimeBlock('Pick up Discount Meat', '1830', '1900', dayIndex, true);
         calendar.addTimeBlock('Pick up Discount Meat', '0930', '1000', dayIndex, true);
         //Get the state of the calendar on a specific day
         const testDay = calendar.state.days[dayIndex]; 
         //expect(testDay.props.timeBlocks.length).toEqual(13);
        // Check each block in testDay to make sure consecutive start and end times are contiguous
        for (let ndx = 0; ndx < testDay.props.timeBlocks.length - 2; ndx ++) {
            const previousBlock = testDay.props.timeBlocks[ndx];
            const currentBlock = testDay.props.timeBlocks[ndx + 1];
            console.log(currentBlock.props.title + ' runs from ' +  currentBlock.props.startTime + ' to ' + currentBlock.props.endTime);
            expect(parseInt(previousBlock.props.endTime)).toEqual(parseInt(currentBlock.props.startTime));
        };
     });

     //Test to determine whether default time blocks generate availableTime as true
     it('should set the availableTime prop to true when a default time block is rendered', () => {
        wrapper = mount(<Calendar />);
        let days = wrapper.children('.calendar-container').first().children('Day');
        let timeBlocks = days.find('div.day-container').children('TimeBlock');
        for (let ndx = 0; ndx < timeBlocks.length; ndx++){
            expect(timeBlocks.at(ndx).props().availableTime).toEqual(true);
        }
     });

     //Test to determine whether an added time block generate availableTime as false (default)
    it('should set the availableTime prop to false when a time block is added', () => {
         wrapper = mount(<Calendar />);
         let calendar = wrapper.instance();
         calendar.addTimeBlock('Meeting with Guy Fieri', '1600', '1700', 0);
         console.log('timeBlock[8]: ' + calendar.state.days[0].props.timeBlocks[8].props.availableTime);
         let newTimeBlock = calendar.state.days[0].props.timeBlocks[8];
         expect(newTimeBlock.props.availableTime).toEqual(false);
    });

    //Test to determine whether an added time block generates availableTime as true when passed in
    it('should set the availableTime prop to true when an occupied time block is added', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        calendar.addTimeBlock('Meeting with Guy Fieri', '1600', '1700', 0, true);
        console.log('timeBlock[8]: ' + calendar.state.days[0].props.timeBlocks[8].props.availableTime);
        let newTimeBlock = calendar.state.days[0].props.timeBlocks[8];
        expect(newTimeBlock.props.availableTime).toEqual(true);
    });

    // Test to ensure we do not modify the end times of the preceding TimeBlock if it is not marked as free time.
    it('should not update the end time of a preceding occupied time block.', () => {
        const dayIndex = 1;
        const firstBlockIndex = 0;
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        // Replace the first time block of the day with an occupied block
        calendar.addTimeBlock('Meeting with April Ludgate', '0800', '0900', dayIndex, false);
        // This should add a time in the second slot of the day
        calendar.addTimeBlock('Meeting with Andy Dwyer', '0830', '0900', dayIndex, false);
        let previousTimeBlock = calendar.state.days[dayIndex].props.timeBlocks[firstBlockIndex];
        expect(previousTimeBlock.props.availableTime).toEqual(false);
        expect(previousTimeBlock.props.endTime).toEqual('0900');
        let newTimeBlock = calendar.state.days[dayIndex].props.timeBlocks[firstBlockIndex + 1];
        expect(newTimeBlock.props.availableTime).toEqual(false);
        expect(newTimeBlock.props.startTime).toEqual('0830'); 
    });

    it('should not consume the next time block if the next time block is occupied.', () => {
        const dayIndex = 1;
        const firstBlockIndex = 0;
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        // Replace the first time block of the day with an occupied block
        calendar.addTimeBlock('Meeting with April Ludgate', '0800', '0900', dayIndex, false);
        // This should add a time in the second slot of the day
        calendar.addTimeBlock('Meeting with Andy Dwyer', '0800', '0900', dayIndex, false);
        let previousTimeBlock = calendar.state.days[dayIndex].props.timeBlocks[firstBlockIndex];
        expect(previousTimeBlock.props.title).toEqual('Meeting with Andy Dwyer');
        let newTimeBlock = calendar.state.days[dayIndex].props.timeBlocks[firstBlockIndex + 1];
        expect(newTimeBlock.props.title).toEqual('Meeting with April Ludgate'); 
    });

    // Test to ensure we do not modify the start times of the following TimeBlock if it is not marked as free time.
    it('should not update the start time of a following occupied time block.', () => {
        const dayIndex = 1;
        const firstBlockIndex = 0;
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        // This should add a time in the second slot of the day
        calendar.addTimeBlock('Meeting with Andy Dwyer', '0830', '0900', dayIndex, false);
        // Replace the first time block of the day with an occupied block
        calendar.addTimeBlock('Meeting with April Ludgate', '0800', '0900', dayIndex, false);
        let newTimeBlock = calendar.state.days[dayIndex].props.timeBlocks[firstBlockIndex];
        expect(newTimeBlock.props.availableTime).toEqual(false);
        expect(newTimeBlock.props.endTime).toEqual('0900');
        let nextTimeBlock = calendar.state.days[dayIndex].props.timeBlocks[firstBlockIndex + 1];
        expect(nextTimeBlock.props.availableTime).toEqual(false);
        expect(nextTimeBlock.props.startTime).toEqual('0830'); 
    });

    //Test to check if a time block has been deleted
    it('should remove a time block from the calendar', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 5;
        const dayID = 'tuesday';
        console.log('Deleting timeblock: ' + timeBlockID + 'on' + dayID);
        calendar.deleteTimeBlock(timeBlockID, dayID);
        console.log('Timeblock Deleted');
        let deletedTimeBlock = calendar.state.days[dayID].props.timeBlock[timeBlockID];
        const day = wrapper.findWhere((d) => d.props().id === dayID);
        expect(day.findWhere((b) => b.props().id === timeBlockID)).toEqual(0);
    });
});