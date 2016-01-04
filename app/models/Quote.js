/* @flow */
export default class Quote {

    name: string;
    symbol: string;
    currency: string;
    lastTrade: string;
    lastTradeDate: string;

    constructor( name: string, symbol: string, currency: string, lastTradePriceOnly: string, lastTradeDate: string ) {
        this.name = name;
        this.symbol = symbol;
        this.currency = currency;
        this.lastTrade = lastTradePriceOnly;
        this.lastTradeDate = lastTradeDate;
    }
}
