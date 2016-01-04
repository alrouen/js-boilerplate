import { Action } from 'airflux';
import { QuoteApi } from 'api/YahooApi';

export const loadQuotes : Action = new Action().asyncResult( QuoteApi.getQuotes ).asFunction;
