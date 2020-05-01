import React from 'react';
import { shallow, mount } from 'enzyme';
import Day from './Day';
import TimeBlock from '../TimeBlock/TimeBlock';

function convertIntToTimeString(intHour) {
    let strHour = intHour.toString() + '00';
    if (intHour < 10) {
        strHour = '0' + strHour;
    }
    return strHour;
}

describe('Day', () => {
    let wrapper; 

    beforeEach(() => wrapper = shallow(<Day />));

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    //Not necessary, passing in more than just a date value
    /*it('should render the date value', () => {
        wrapper.setProps({ numericDay: '32'});
        expect(wrapper.text()).toEqual('32');
    });*/
    
    it('should render 12 time blocks', () => {
        expect(wrapper.find('TimeBlock').length).toEqual(12);
    });

    it('should render the first time block with start time of 0800 - 0900 when no parameters are passed', () => {
        wrapper = mount(<Day />);
        const firstTimeBlock = wrapper.find('div.day-container').children('TimeBlock').at(0);
        //const firstActualTimeBlock = timeBlocks.get(0);
        //expect(firstActualTimeBlock.props.startTime).toEqual('0800');
        const timeBlockTimes = firstTimeBlock.find('.timeblock-time-container');
        expect(timeBlockTimes.text()).toEqual('0800 - 0900');
    });

    it('should render sequential time blocks when no parameters are passed', () => {
        wrapper = mount(<Day />);
        const timeBlocks = wrapper.children('div.day-container').at(0).children('TimeBlock');
        //expect(timeBlocks.length).toEqual(12)
        let timeBlock, startTime, endTime, timeRange, theoreticalTimeRange;
        for (let ndx = 0; ndx < timeBlocks.length; ndx++) {
            timeBlock = timeBlocks.at(ndx);
            timeRange = timeBlock.find('div.timeblock-time-container').text();
            startTime = convertIntToTimeString(ndx + 8);
            endTime = convertIntToTimeString(ndx + 9);
            theoreticalTimeRange = startTime + ' - ' + endTime;
            expect(timeRange).toEqual(theoreticalTimeRange);
        }
    
    });

    it('should add a time block', () => {
        let day = wrapper.instance();
        day.addTimeBlock('Meeting with Pete', '1200', '0100');
        expect(wrapper.find('TimeBlock').length).toEqual(13);
    });

    it('should have an ID equal to the startTime', () => {
        wrapper = mount(<Day />);
        const timeBlockList = wrapper.children('div.day-container').at(0).children('TimeBlock');
        timeBlockList.forEach((node) => {
            expect(node.key()).toEqual(node.prop('startTime'));
            //expect(node.key()).toEqual('0800');
        });


    });
});