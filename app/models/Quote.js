// import moment from 'moment';

export default class Quote {
    constructor( name, symbol, currency, lastTradePriceOnly, lastTradeDate ) {
        this.name = name;
        this.symbol = symbol;
        this.currency = currency;
        this.lastTrade = lastTradePriceOnly;
        this.lastTradeDate = lastTradeDate;
    }
}
