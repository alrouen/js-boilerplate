/* @flow */
// $IgnoreFlow
import './Quote.scss';
import React from 'react';

export default class Quote extends React.Component {
    static props: {
        quote: Quote,
    };

    render(): Object {
        return <div className="quote"><span className="fa fa-anchor"></span>{this.props.quote.name}</div>;
    }
}
