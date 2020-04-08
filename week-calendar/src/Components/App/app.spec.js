import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calendar from '../Calendar/Calendar';

describe ('App', () => {
    let wrapper; 

    beforeEach(() => wrapper = shallow(< App />));

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    it('should render a Calendar component', () => {
        expect(wrapper.containsMatchingElement(<Calendar />)).toEqual(true);
    });
});
