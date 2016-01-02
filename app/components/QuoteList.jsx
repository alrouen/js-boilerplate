import React from 'react';
import airflux from 'airflux';
import * as YahooQuoteActions from 'app/stores/YahooQuoteActions';
import YahooQuoteStore from 'app/stores/YahooQuoteStore';
// import Quote from './Quote';

export default class QuoteList extends airflux.FluxComponent {
    constructor( props ) {
        super( props, { quotes: YahooQuoteStore });
    }

    componentDidMount() {
        super.componentDidMount();
        YahooQuoteActions.loadQuotes(['YHOO', 'WWW']);
    }

    renderQuotes() {
        if ( this.state && this.state.quotes && this.state.quotes.length > 0 ) {
            return (
                <ul>
                    {this.state.quotes.map(( q ) => <li key={q.symbol}>{q.name}</li> ) }
                </ul>
            );
        }
        return <div>no quotes</div>;
    }

    render() {
        return (
            <div className="value">
                { this.renderQuotes() }
            </div>
        );
    }
}
