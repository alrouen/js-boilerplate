import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import assert from 'assert';
import MyChildComponent from 'app/components/MyChildComponent.jsx';

describe('MyChildComponent', () => {
    it('renders as expected', () => {
        const component = renderIntoDocument( <MyChildComponent /> );
        const valueComponent = findRenderedDOMComponentWithClass(component, 'value');
        assert.equal(valueComponent.textContent, 'A Simple ChildComponent');
    });
});
