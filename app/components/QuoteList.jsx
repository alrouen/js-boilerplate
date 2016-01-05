/* @flow */
// $IgnoreFlow
import './QuoteList.scss';

import React, { Component } from 'react';
import { FluxComponent } from 'airflux';
import * as YahooQuoteActions from 'stores/YahooQuoteActions';
import YahooQuoteStore from 'stores/YahooQuoteStore';
import Quote from './Quote';

// $IgnoreFlow
@FluxComponent
export default class QuoteList extends Component {
    constructor( props: Object ) {
        super( props );
        this.listenTo( YahooQuoteStore, this.quotesLoaded );
    }

    componentDidMount() {
        YahooQuoteActions.loadQuotes(['YHOO', 'WWW']);
    }

    quotesLoaded( quotes ) {
        this.setState({ quotes });
    }

    renderQuotes(): Object {
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
