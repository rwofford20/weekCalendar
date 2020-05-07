import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calendar from '../Calendar/Calendar';

describe ('App', () => {
    let wrapper; 

    beforeEach(() => wrapper = shallow(< App />));

    //Test to see if App.jsx renders a div
    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    //Snapshot test
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    //Test to determine if App.jsx renders a Calendar component
    it('should render a Calendar component', () => {
        expect(wrapper.containsMatchingElement(<Calendar />)).toEqual(true);
    });
});
