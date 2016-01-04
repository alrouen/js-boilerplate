import './QuotePage.scss';
import React from 'react';
import QuoteList from './QuoteList.jsx';

export default class QuotePage extends React.Component {
    render() {
        return (
            <div className="quote-page">
                <QuoteList />
            </div>
        );
    }
}
