import React from 'react';
import { shallow } from 'enzyme';
import Day from './Day';

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
    
    it('should render a time block', () => {
        expect(wrapper.find('TimeBlock').length).toEqual(1);
    });
});