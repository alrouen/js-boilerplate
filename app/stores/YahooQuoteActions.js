import { Action } from 'airflux';
import { QuoteApi } from 'app/api/YahooApi';

export const loadQuotes : Action = new Action().asyncResult( QuoteApi.getQuotes ).asFunction;
