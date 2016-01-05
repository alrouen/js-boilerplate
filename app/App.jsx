import './css/main.scss';

import React from 'react';
import { Router, Route, Link, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import QuotePage from 'components/QuotePage';
import DummyComponent from 'components/MyDummyComponent';

class AppRoot extends React.Component {

    constructor( props ) {
        super( props );
    }

    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route
        };
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

AppRoot.childContextTypes = {
    location: React.PropTypes.object,
    route: React.PropTypes.object
};

const appHistory = useRouterHistory( createHashHistory )({ queryKey: false });

export default (
    <Router history={appHistory}>
        <Route path="/" component={AppRoot}>
            <Route path="quotes" component={QuotePage}/>
            <Route path="dummycomponent" component={DummyComponent} />
            <Route path="*" component={QuotePage}/>
        </Route>
    </Router>
);
