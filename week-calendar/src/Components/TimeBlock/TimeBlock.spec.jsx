import React from 'react';
import {shallow } from 'enzyme';
import TimeBlock from './TimeBlock';

describe('TimeBlock', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<TimeBlock />));

    //Snapshot test
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    //Test to determing if 1 timeblock container is rendered in TimeBlock.jsx
    it('it should render a div with the class timeblock-container', () => {
        expect(wrapper.find('div.timeblock-container').length).toEqual(1);
    });

    /* No longer nexessary - more thorough tests exist
    //Test to determine if the time block renders a title of 'Sample'
    it('it should render a title', () => {
        wrapper.setProps({ title: 'Sample'});
        expect(wrapper.text()).toEqual('Sample');
    });

    //Test to determine if the time block renders a start time of '900'
    it('it should render a start time', () => {
        wrapper.setProps({ startTime: '900'});
        expect(wrapper.text()).toEqual('900');
    });

    //Test to determine if the time block renders an end time of '1000'
    it('it should render an end time', () => {
        wrapper.setProps({ endTime: '1000'});
        expect(wrapper.text()).toEqual('1000');
    });
    */

    //Test to determine if a time block renders a specific title in its first child, timeblock-title-container
    it('should render the meeting title in the first child div', () => {
        wrapper.setProps({title: 'Meet with Malcolm Reynolds', startTime: 1245, endTime: 1345});
        expect(wrapper.find('div.timeblock-container').children('.timeblock-title-container').at(0).text()).toEqual(
            "Meet with Malcolm Reynolds");
    });

    //Test to see if a div is rendered with the class timblock-time-container in TimeBlock.jsx
    it('should render a div with the class timeblock-time-container', () => {
        expect(wrapper.find('div.timeblock-time-container').length).toEqual(1);
    });

    //Test to see if a time block will render a meeting time in the form 1245 - 1245
    it('should render the meeting time in the format: startTime - endTime', () => {
        wrapper.setProps({title: 'Meet with Malcolm Reynolds', startTime: 1245, endTime: 1345});
        expect(wrapper.find('div.timeblock-container').children('.timeblock-time-container').at(0).text()).toEqual(
            "1245 - 1345");
    });

});