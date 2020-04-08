import React from 'react';
import { shallow } from 'enzyme';
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

});