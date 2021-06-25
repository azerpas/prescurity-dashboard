import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {IUserContext, UserContext} from "../context/user";
import {useEffect, useState} from "react";
import {User} from "../entity/user";
import firebase from "../utils/client";

function onAuthStateChange(callback: (IUserContext) => void) {
    return firebase.auth().onAuthStateChanged(credentialUser => {
        if (credentialUser) {
            const {displayName, refreshToken, email, uid} = credentialUser;
            callback({loggedIn: true, user: new User(displayName, refreshToken, email, uid)});
        } else {
            callback({loggedIn: false, user: null});
        }
    });
}

function MyApp({Component, pageProps}: AppProps) {
    const [user, setUser] = useState({loggedIn: false, user: null});
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext.Provider>
    );
}

export default MyApp
