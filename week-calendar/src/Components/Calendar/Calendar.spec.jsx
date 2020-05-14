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
        //let deletedTimeBlock = calendar.state.days[dayID].props.timeBlock[timeBlockID];
        wrapper.update();
        const day = wrapper.findWhere((d) => d.props().id === dayID);
        expect(day.findWhere((b) => b.props().id === timeBlockID).length).toEqual(0);
    });

    it('should fill the gap before the first timeBlock when editing it', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 'Avoiding Michael08000930';
        const dayId = 'wednesday';
        const dayIndex = 2;
        // Add a new time block to Wednesday
        calendar.addTimeBlock('Avoiding Michael', '0800', '0930', dayIndex, false);
        wrapper.update();
        let wed = wrapper.find('Day').at(dayIndex);
        //console.log('Length of wednesday: ' + wed.length);
        console.log('ID for wednesday: ' + wed.props().id);
        let wedTimeBlocks = wed.find('TimeBlock');
        // Check that the add went as expected: the new meeting replaces all but four of the default blocks
        //expect(wedTimeBlocks).to.have.length(12);
        expect(wedTimeBlocks.length).toEqual(12);
        let timeBlock = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // And we have successfully identified the new time block
        expect(timeBlock.props().startTime).toEqual('0800');
        expect(timeBlock.props().endTime).toEqual('0930');
        // Change the time block's data
        calendar.updateTimeBlock(timeBlockID, dayId, 'Michael is going home early!', '0830', '0930', false);
        wrapper.update();

        let wed2 = wrapper.find('Day').at(dayIndex);
        let wedTimeBlocks2 = wed2.find('TimeBlock');
        console.log('Wed2 has ' + wedTimeBlocks2.length + ' time blocks');
        // wedTimeBlocks.forEach(block => console.log('Wednesday has a block with id = ' + block.props().id));
        let timeBlock2 = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // Check that the props are updated on the edited time block
        expect(timeBlock2.props().title).toEqual('Michael is going home early!');
        expect(timeBlock2.props().startTime).toEqual('0830');
        expect(timeBlock2.props().endTime).toEqual('0930');

        // Expect the first time block to fill the 0800-0830 gap
        let firstTimeBlock = wedTimeBlocks2[0];
        expect(firstTimeBlock.props().title).toEqual('');
        expect(firstTimeBlock.props().startTime).toEqual('0800');
        expect(firstTimeBlock.props().endTime).toEqual('0830');
    });


    it('should edit an existing time block title', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 'Avoiding Michael09001700';
        const dayId = 'wednesday';
        const dayIndex = 2;
        // Add a new time block to Wednesday
        calendar.addTimeBlock('Avoiding Michael', '0900', '1700', dayIndex, false);
        wrapper.update();
        // Change the time block's data
        calendar.updateTimeBlock(timeBlockID, dayId, 'Michael is going home early!', '0900', '1700', false);
        // Check to see that the newly freed space is populated by free time blocks.
        wrapper.update();
        let wed = wrapper.find('Day').at(dayIndex);
        let wedTimeBlocks = wed.find('TimeBlock');
        console.log('Length of wedTimeBlocks: ' + wedTimeBlocks.length);
        let timeBlock = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // And we have successfully identified the new time block
        expect(timeBlock.props().title).toEqual('Michael is going home early!');
    });

    it('should edit the start and/or end time of a timeBlock that is not the first or last', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 'Avoiding Michael09001700';
        const dayId = 'wednesday';
        const dayIndex = 2;
        // Add a new time block to Wednesday
        calendar.addTimeBlock('Avoiding Michael', '0900', '1700', dayIndex, false);
        wrapper.update();
        let wed = wrapper.find('Day').at(dayIndex);
        //console.log('Number of days: ' + wrapper.find('Day').length);
        console.log('Length of wednesday: ' + wed.length);
        console.log('ID for wednesday: ' + wed.props().id);
        let wedTimeBlocks = wed.find('TimeBlock');
        // Check that the add went as expected: the new meeting replaces all but four of the default blocks
        //expect(wedTimeBlocks.length).toEqual(5);
        let timeBlock = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // And we have successfully identified the new time block
        expect(timeBlock.props().startTime).toEqual('0900');
        expect(timeBlock.props().endTime).toEqual('1700');
        // Change the time block's data
        calendar.updateTimeBlock(timeBlockID, dayId, dayId, 'Michael is going home early!', '0900', '1430', false);
        // Check to see that the newly freed space is populated by free time blocks.
        wrapper.update();
        //expect(wedTimeBlocks.length).toEqual(8);
        expect(timeBlock.props().title).toEqual('Michael is going home early!');
        expect(timeBlock.props().startTime).toEqual('0900');
        expect(timeBlock.props().endTime).toEqual('1430');
    });

    it('should fill the gap for the first TimeBlock when deleting an overlapping block', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 'Avoiding Michael08000930';
        const dayId = 'wednesday';
        const dayIndex = 2;
        // Add a new time block to Wednesday
        calendar.addTimeBlock('Avoiding Michael', '0800', '0930', dayIndex, false);
        wrapper.update();
        let wed = wrapper.find('Day').at(dayIndex);

        let wedTimeBlocks = wed.find('TimeBlock');

        let timeBlock = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // And we have successfully identified the new time block
        expect(timeBlock.props().startTime).toEqual('0800');
        expect(timeBlock.props().endTime).toEqual('0930');

        // Delete the time block
        calendar.deleteTimeBlock(timeBlockID, dayId);
        wrapper.update();

        let wed2 = wrapper.find('Day').at(dayIndex);

        let wedTimeBlocksFirst = wed2.find('TimeBlock').at(0);
        let wedTimeBlocksSecond = wed2.find('TimeBlock').at(1);
        
        // Check that the first time block on Wednesday has a start time of 0800 and an end time of 0900
        expect(wedTimeBlocksFirst.props().startTime).toEqual('0800');
        expect(wedTimeBlocksFirst.props().endTime).toEqual('0900');
        expect(wedTimeBlocksFirst.props().availableTime).toEqual(true);

        // Check that the second time block on Wednesday has a start time of 0900 and an end time of 1000
        expect(wedTimeBlocksSecond.props().startTime).toEqual('0900');
        expect(wedTimeBlocksSecond.props().endTime).toEqual('1000');
        expect(wedTimeBlocksSecond.props().availableTime).toEqual(true);

    });

    it('should fill the gap for a middle TimeBlock when deleting an overlapping block', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 'Avoiding Michael11001230';
        const dayId = 'wednesday';
        const dayIndex = 2;
        // Add a new time block to Wednesday
        calendar.addTimeBlock('Avoiding Michael', '1100', '1230', dayIndex, false);
        wrapper.update();
        let wed = wrapper.find('Day').at(dayIndex);

        let wedTimeBlocks = wed.find('TimeBlock');

        let timeBlock = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // And we have successfully identified the new time block
        expect(timeBlock.props().startTime).toEqual('1100');
        expect(timeBlock.props().endTime).toEqual('1230');

        // Delete the time block
        calendar.deleteTimeBlock(timeBlockID, dayId);
        wrapper.update();

        let wed2 = wrapper.find('Day').at(dayIndex);

        let wedTimeBlocksFirst = wed2.find('TimeBlock').at(3);
        let wedTimeBlocksSecond = wed2.find('TimeBlock').at(4);
        
        // Check that the first time block on Wednesday has a start time of 0800 and an end time of 0900
        expect(wedTimeBlocksFirst.props().startTime).toEqual('1100');
        expect(wedTimeBlocksFirst.props().endTime).toEqual('1200');
        expect(wedTimeBlocksFirst.props().availableTime).toEqual(true);

        // Check that the second time block on Wednesday has a start time of 0900 and an end time of 1000
        expect(wedTimeBlocksSecond.props().startTime).toEqual('1200');
        expect(wedTimeBlocksSecond.props().endTime).toEqual('1300');
        expect(wedTimeBlocksSecond.props().availableTime).toEqual(true);

    });

    it('should fill the gap for the last TimeBlock when deleting an overlapping block', () => {
        wrapper = mount(<Calendar />);
        let calendar = wrapper.instance();
        const timeBlockID = 'Avoiding Michael18302000';
        const dayId = 'wednesday';
        const dayIndex = 2;
        // Add a new time block to Wednesday
        calendar.addTimeBlock('Avoiding Michael', '1830', '2000', dayIndex, false);
        wrapper.update();
        let wed = wrapper.find('Day').at(dayIndex);

        let wedTimeBlocks = wed.find('TimeBlock');

        let timeBlock = wedTimeBlocks.findWhere((tb) => tb.props().id === timeBlockID);
        // And we have successfully identified the new time block
        expect(timeBlock.props().startTime).toEqual('1830');
        expect(timeBlock.props().endTime).toEqual('2000');

        // Delete the time block
        calendar.deleteTimeBlock(timeBlockID, dayId);
        wrapper.update();

        let wed2 = wrapper.find('Day').at(dayIndex);

        let wedTimeBlocksFirst = wed2.find('TimeBlock').at(10);
        let wedTimeBlocksSecond = wed2.find('TimeBlock').at(11);
        
        // Check that the first time block on Wednesday has a start time of 1800 and an end time of 1900
        expect(wedTimeBlocksFirst.props().startTime).toEqual('1800');
        expect(wedTimeBlocksFirst.props().endTime).toEqual('1900');
        expect(wedTimeBlocksFirst.props().availableTime).toEqual(true);

        // Check that the second time block on Wednesday has a start time of 1900 and an end time of 2000
        expect(wedTimeBlocksSecond.props().startTime).toEqual('1900');
        expect(wedTimeBlocksSecond.props().endTime).toEqual('2000');
        expect(wedTimeBlocksSecond.props().availableTime).toEqual(true);

    });

});