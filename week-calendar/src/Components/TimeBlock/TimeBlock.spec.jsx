import React from 'react';
import {shallow } from 'enzyme';
import TimeBlock from './TimeBlock';

describe('TimeBlock', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<TimeBlock />));

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('it should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('it should render a title', () => {
        wrapper.setProps({ title: 'Sample'});
        expect(wrapper.text()).toEqual('Sample');
    });

    it('it should render a start time', () => {
        wrapper.setProps({ startTime: '900'});
        expect(wrapper.text()).toEqual('900');
    });

    it('it should render an end time', () => {
        wrapper.setProps({ endTime: '1000'});
        expect(wrapper.text()).toEqual('1000');
    });
});