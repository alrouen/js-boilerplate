import _ from 'lodash';
import Uri from './Uri';
import { validJson } from './HttpTransformer';
import Quote from 'models/Quote';

const YAHOOBASEURL = 'http://query.yahooapis.com';

// Yahoo query params for Quotes :
// q= select * from yahoo.finance.quotes where symbol in ("YHOO","AAPL","GOOG","MSFT")
// env= http://datatables.org/alltables.env
// format= json
function buildYahooParams( query, env, format ) {
    return {
        q: query || '',
        env: env || 'http://datatables.org/alltables.env',
        format: format || 'json'
    };
}

/*
    transform the json result from Yahoo API into local model Quote
 */
function quoteToModel( json ) : Array< Quote > {
    const fromJson = ( q ) => {
        return new Quote( q.Name, q.Symbol, q.Currency, q.LastTradePriceOnly, q.LastTradeDate );
    };

    if ( json && json.query ) {
        const count = json.query.count || 0;

        switch ( count ) {
            case 0:
                return [];
            case 1:
                const singleQuote = [];
                singleQuote.push( fromJson( json.query.results.quote ));
                return singleQuote;
            default:
                return json.query.results.quote.map( fromJson );
        }
    }
    return [];
}

export const QuoteApi = {
    getQuotes: ( quotes: Array< string > | string ): Array< Quote > => {
        let flattenQuotes = '';
        if ( _.isArray( quotes )) {
            flattenQuotes = quotes.map( q => `\"${q}\"` ).join( ',' );
        } else {
            flattenQuotes = `\"${quotes}\"`;
        }

        const query = `select * from yahoo.finance.quotes where symbol in (${flattenQuotes})`;

        // check https://github.com/github/fetch
        return fetch( new Uri( '{0}/v1/public/yql', YAHOOBASEURL ).query( buildYahooParams( query )))
            .then( validJson )
            .then( quoteToModel );
    }
};
