import './css/main.scss';
import React from 'react';
import QuotePage from 'app/components/QuotePage.jsx';

export default class App extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return <QuotePage />;
    }
}
