import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';

describe('Header', () => {
    let wrapper; 
    beforeEach(() => wrapper = shallow(<Header />));

    it('it should render a div with the class header-container', () => {
        expect(wrapper.find('div.header-container').length).toEqual(1);
    });
});
