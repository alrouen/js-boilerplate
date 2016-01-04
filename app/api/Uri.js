/**
 * Constructs a URI.
 * The format string should have {n} that will be replaced by the nth argument.
 *
 * The object uses toString or query to render the final string: make sure you call either of
 * those manually or that the framework calls it automatically.
 */
export default class Uri {
    constructor( format: string ) {
        const args = Array.prototype.slice.call( arguments, 1 );

        this.url = format.replace( /{(\d+)}/g, ( match, number ) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    toString(): string { return this.url; }

    query( object ): string {
        const args = [];
        for ( const key in object ) {
            if ({}.hasOwnProperty.call( object, key )) {
                const val = object[key];
                if ( val !== '' ) {
                    args.push( key + '=' + encodeURIComponent( object[key]));
                }
            }
        }

        if ( args.length === 0 ) {
            return this.toString();
        }
        return this.url + '?' + args.join( '&' );
    }
}
