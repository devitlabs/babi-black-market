
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { DeleteKeyPair, GetValueForKey, SaveKeyPair } from './ExpoStore';

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
    /**
     * If session data exist in local storage, set value as session header.
     */

    return GetValueForKey("woo-session")
        .then(session => {

            if (session) {
                operation.setContext(({ headers = {} }) => ({
                    headers: {
                        "woocommerce-session": `Session ${session}`
                    }
                }));
            }

            return forward(operation);
        })





});

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {

    return forward(operation).map(response => {


        /**
         * Check for session header and update session in local storage accordingly.
         */
        const context = operation.getContext();
        const { response: { headers } } = context;
        const session = headers.get("woocommerce-session");

        if(session){

            console.log("sessllikon", session);
            DeleteKeyPair("woo-session");
            SaveKeyPair("woo-session", headers.get("woocommerce-session"));
        }


        // if (session) {

        //     // Remove session data if session destroyed.
        //     if ("false" === session) {

        //         DeleteKeyPair("woo-session");

        //         // Update session new data if changed.
        //         GetValueForKey("woo-session").then(session => {
        //             if (session !== headers.get("woocommerce-session")) {
        //                 SaveKeyPair("woo-session", headers.get("woocommerce-session"));
        //             }


        //         })
        //     }


        // }

        return response;


    });
});

// Apollo GraphQL client.
const client = new ApolloClient({
    link: middleware.concat(afterware.concat(createHttpLink({
        uri: `https://babiblackmarket.com/graphql`,
        fetch: fetch
    }))),
    cache: new InMemoryCache(),
});

export default client;