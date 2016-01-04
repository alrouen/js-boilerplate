import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import assert from 'assert';
import MyDummyComponent from 'app/components/MyDummyComponent.jsx';

describe('MyDummyComponent', () => {
    it('renders as expected', () => {
        const component = renderIntoDocument( <MyDummyComponent /> );
        const valueComponent = findRenderedDOMComponentWithClass(component, 'value');
        assert.equal(valueComponent.textContent, 'A Simple Component');
    });
});
