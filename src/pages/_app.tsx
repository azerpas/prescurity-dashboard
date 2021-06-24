import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {UserContext} from "../context/user";
import {useEffect, useState} from "react";
import {User} from "../entity/user";
import firebase from "../utils/client";

function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback({loggedIn: true, user: user});
            } else {
                callback({loggedIn: false});
            }
        });
}

function MyApp({Component, pageProps}: AppProps) {

    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        // TODO :
        // erreur : JSX element type 'UserContext' does not have any construct or call signatures.
        <UserContext.Provider value={user}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext.Provider>
    );
}

export default MyApp
