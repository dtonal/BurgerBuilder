import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { isMainThread } from 'worker_threads';

configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => null} />)
    })

    it('should render BuildControls when receiving ingredients', () => {
        wrapper.setProps({
            ings: { salad: 1 },
            price: 1.1
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});

