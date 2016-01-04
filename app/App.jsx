import './css/main.scss';

import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import QuotePage from 'components/QuotePage';
import DummyComponent from 'components/MyDummyComponent';

class AppRoot extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="app">
                <h1>App</h1>
                <ul className="navigation">
                    <li><Link to="/quotes">Quotes</Link></li>
                    <li><Link to="/dummycomponent">Dummy</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default (
    <Router history={hashHistory}>
        <Route path="/" component={AppRoot}>
            <Route path="quotes" component={QuotePage}/>
            <Route path="dummycomponent" component={DummyComponent} />
            <Route path="*" component={QuotePage}/>
        </Route>
    </Router>
);
