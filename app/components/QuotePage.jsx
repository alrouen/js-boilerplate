/* @flow */
// $IgnoreFlow
import './QuotePage.scss';
import React from 'react';
import QuoteList from './QuoteList.jsx';

export default class QuotePage extends React.Component {
    render(): Object {
        return (
            <div className="quote-page">
                <QuoteList />
            </div>
        );
    }
}

QuotePage.contextTypes = {
    location: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
};
