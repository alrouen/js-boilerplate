/* @flow */
// $IgnoreFlow
import './QuoteList.scss';

import React from 'react';
import airflux from 'airflux';
import * as YahooQuoteActions from 'stores/YahooQuoteActions';
import YahooQuoteStore from 'stores/YahooQuoteStore';
import Quote from './Quote';

export default class QuoteList extends airflux.FluxComponent {
    constructor( props: Object ) {
        super( props, { quotes: YahooQuoteStore });
    }

    componentDidMount() {
        super.componentDidMount();
        YahooQuoteActions.loadQuotes(['YHOO', 'WWW']);
    }

    renderQuotes(): Object{
        if ( this.state && this.state.quotes && this.state.quotes.length > 0 ) {
            return (
                <div className="quote-list">
                    { this.state.quotes.map(( q ) => <div key={q.symbol}><Quote quote={q}/></div> ) }
                </div>
            );
        }
        return <div className="quote-list-empty">no quotes</div>;
    }

    render(): Object {
        return this.renderQuotes();
    }
}
