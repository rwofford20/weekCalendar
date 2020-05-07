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

     //This test is going poorly right now, throwing an error about props being  undefoned in the code
     //Aside from the test, the portion of the code this is testing seems to be working correctly
     //Check that the end time of the previous TimeBlock equals the start time of the next TimeBlock
     it('should match the end time of the previous time block to the start time of the new time block', () => {
         wrapper = mount(<Calendar />);
         const dayIndex = 0;
         //Create an instance of the Calendar component and add 3 different TieBlocks to the same day
         let calendar = wrapper.instance();
         calendar.addTimeBlock('Meeting at Food and Stuff', '1230', '1330', dayIndex);
         calendar.addTimeBlock('Pick up Discount Meat', '1830', '1900', dayIndex);
         calendar.addTimeBlock('Pick up Discount Meat', '0930', '1000', dayIndex);
         //Get the state of the calenddar on a specific day
         const testDay = calendar.state.days[dayIndex]; 
         //expect(testDay.props.timeBlocks.length).toEqual(13);
        // Check each block in testDay to make sure consecutive start and end times are contiguous
        for (let ndx = 0; ndx < testDay.props.timeBlocks.length - 2; ndx ++) {
            const previousBlock = testDay.props.timeBlocks[ndx];
            const currentBlock = testDay.props.timeBlocks[ndx + 1];
            expect(parseInt(previousBlock.props.endTime)).toEqual(parseInt(currentBlock.props.startTime));
        };
     });

});