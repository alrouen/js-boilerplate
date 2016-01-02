/**
 * Checks for the status of a response. By default, fetch only reject when the
 * request completely fails to be made, not on server responses.
 */
export function valid( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
        return Promise.resolve( response );
    }
    return Promise.reject( new Error( response.statusText ));
}


/**
 * Checks for the status of a response. By default, fetch only reject when the
 * request completely fails to be made, not on server responses.
 * Here on anything else then >200 and <300, we extract the json and reject the original promise
 */
export function validJson( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
        return response.json();
    }

    return new Promise(( resolve, reject ) => {
        reject( response );
    });
}


/**
 * Tries to parse the JSON payload.
 */
export function json( response ) {
    return response.json();
}
