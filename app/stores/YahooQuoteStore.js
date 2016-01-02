import airflux from 'airflux';
import * as YahooQuoteActions from 'app/stores/YahooQuoteActions';

class YahooQuoteStore extends airflux.Store {
    constructor() {
        super();
        this.quotes = [];
        this.listenTo( YahooQuoteActions.loadQuotes.completed, this.quotesLoaded );
    }

    get state() {
        return this.quotes;
    }

    quotesLoaded( quotes ) {
        this.quotes = quotes;
        this.publishState();
    }
}

export default new YahooQuoteStore();
