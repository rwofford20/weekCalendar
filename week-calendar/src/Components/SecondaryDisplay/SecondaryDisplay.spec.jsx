import React from 'react';
import { shallow, mount } from 'enzyme';
import SecondaryDisplay from './SecondaryDisplay';

describe('SecondaryDisplay', () => {
    let wrapper; 
    beforeEach(() => wrapper = shallow(<SecondaryDisplay />));

    it('it should render a div with the class secondary-display-container', () => {
        expect(wrapper.find('div.secondary-display-container').length).toEqual(1);
    });
});
