/* @flow */
import { Store } from 'airflux';
import * as YahooQuoteActions from 'stores/YahooQuoteActions';
import Quote from 'models/Quote';

class YahooQuoteStore extends Store {
    constructor() {
        super();
        this.quotes = [];
        this.listenTo( YahooQuoteActions.loadQuotes.completed, this.quotesLoaded );
    }

    get state(): Array< Quote > {
        return this.quotes;
    }

    quotesLoaded( quotes: Array< Quote > ) : void {
        this.quotes = quotes;
        this.publishState();
    }
}

export default new YahooQuoteStore();
