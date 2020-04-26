import React from 'react';
import {shallow } from 'enzyme';
import TimeBlock from './TimeBlock.jsx';

describe('TimeBlock', () => {
    let wrapper;

    beforeEach = (() => wrapper = shallow(<TimeBlock />));

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('it should render a div', () => {
        expect(wrapper.find('div')).toEqual(1);
    });

});