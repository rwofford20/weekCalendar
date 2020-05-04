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

    it('should have an ID equal to the index', () => {
        wrapper = mount(<Day />);
        const timeBlockList = wrapper.children('div.day-container').at(0).children('TimeBlock');
        for (let ndx =0; ndx < timeBlockList.length; ndx++) {
            expect(timeBlockList.at(ndx).key()).toEqual(ndx.toString());
        };
        //timeBlockList.forEach((node) => {
            //expect(node.key()).toEqual(node.prop('key'));
            //expect(node.key()).toEqual('0800');
        //});
    });

    it('should create a new timeBlock when new data is added', () => {
        wrapper = mount(<Day />);
        wrapper.setProps({TimeBlock: {title: 'Meeting with Leslie Knope', startTime: '2200', endTime: '2300'}});
        expect(wrapper.find('TimeBlock').length).toEqual(13);
        let lastTimeBlock = wrapper.find('.day-container').first().children('TimeBlock').last();
        let lastTimeBlockTitle = lastTimeBlock.find('.timeblock-title-container').text();
        expect(lastTimeBlockTitle).toEqual('Meeting with Leslie Knope');
        let lastTimeBlockStartTime = lastTimeBlock.find('.timeblock-time-container').text();
        expect(lastTimeBlockStartTime).toEqual('1100 - 1200');
    })



});