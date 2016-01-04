function startApp() {
    const ReactDOM = require( 'react-dom' );
    const App = require( './App' ).default;
    ReactDOM.render( App, document.getElementById( 'app' ));
}

require( 'es6-promise' ).polyfill();
require( 'whatwg-fetch' );

if ( !global.Intl ) {
    // Webpack parses the inside of require.ensure at build time to know that intl
    // should be bundled separately. You could get the same effect by passing
    // ['intl'] as the first argument.
    require.ensure([], () => {
        // Ensure only makes sure the module has been downloaded and parsed.
        // Now we actually need to run it to install the polyfill.
        require( 'intl' );
        require( 'intl/locale-data/jsonp/en.js' );
        startApp();
    });
} else {
    startApp();
}
