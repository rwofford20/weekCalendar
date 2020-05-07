import React from 'react';
import { mount, shallow } from 'enzyme';
import Calendar from './Calendar';

describe('Calendar', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calendar />));

    it ('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render 5 days', () => {
        expect(wrapper.find('Day').length).toEqual(5);
    });

    it('Each Day should have an ID corresponding to the day of the week', () => {
        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        wrapper = mount(<Calendar />);
        const dayList = wrapper.children('div.calendar-container').at(0).children('Day');
        for (let ndx = 0; ndx < dayList.length; ndx++) {
            expect(dayList.at(ndx).key()).toEqual(weekdays[ndx]);
        }
    });

    it('should render 12 time blocks', () => {
        wrapper = mount(<Calendar />);
        let firstDay = wrapper.children('div.calendar-container').first().children('Day').first();
        expect(firstDay.find('TimeBlock').length).toEqual(12);
    });

    it('should render the first time block with start time of 0800 - 0900 when no parameters are passed', () => {
        wrapper = mount(<Calendar />);
        let firstDay = wrapper.children('.calendar-container').first().children('Day').first();
        const firstTimeBlock = firstDay.find('div.day-container').children('TimeBlock').at(0);
        //const firstActualTimeBlock = timeBlocks.get(0);
        //expect(firstActualTimeBlock.props.startTime).toEqual('0800');
        const timeBlockTimes = firstTimeBlock.find('.timeblock-time-container');
        expect(timeBlockTimes.text()).toEqual('0800 - 0900');
    });

    it('should add a time block', () => {
        wrapper = mount(<Calendar />);
        const dayIndex = 0;
        let calendar = wrapper.instance();
        calendar.addTimeBlock('Meeting with Burt Macklin', '1200', '0100', dayIndex);
        let firstDay = calendar.state.days[dayIndex];
        expect(firstDay.props.timeBlocks.length).toEqual(13);
        // We can't figure out how to run the test with Enzyme wrappers
        // The wrapper does not appear to update after we call addTimeBlock.
        //const firstDay = wrapper.children('.calendar-container').at(0).children('Day').at(dayIndex);
        //expect(firstDay.find('TimeBlock').length).toEqual(13);
     });

     it('should order time blocks by start time', () => {
        wrapper = mount(<Calendar />);
        const dayIndex = 0;
        let calendar = wrapper.instance();
        calendar.addTimeBlock('Meeting at JJs Diner', '0700', '0800', dayIndex);
        calendar.addTimeBlock('Meeting at Food and Stuff', '1230', '1330', dayIndex);
        calendar.addTimeBlock('Pick up Discount Meat', '2000', '2100', dayIndex);
        const testDay = calendar.state.days[dayIndex]; 
        expect(testDay.props.timeBlocks.length).toEqual(15);
        // Check each block in testDay to make sure the start times are increasing
        for (let ndx = 0; ndx < testDay.props.timeBlocks.length - 1; ndx ++) {
            const currentBlock = testDay.props.timeBlocks[ndx];
            const nextBlock = testDay.props.timeBlocks[ndx + 1];
            expect(parseInt(currentBlock.props.startTime)).toBeLessThanOrEqual(parseInt(nextBlock.props.startTime))
        }
     });

     it('should match the end time of the previous time block to the start time of the new time block', () => {
         wrapper = mount(<Calendar />);
         const dayIndex = 0;
         let calendar = wrapper.instance();
         calendar.addTimeBlock('Meeting at Food and Stuff', '1230', '1330', dayIndex);
         calendar.addTimeBlock('Pick up Discount Meat', '1830', '1900', dayIndex);
         calendar.addTimeBlock('Pick up Discount Meat', '0930', '1000', dayIndex);
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