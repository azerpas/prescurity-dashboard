import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {IUserContext, UserContext} from "../context/user";
import {useEffect, useState} from "react";
import {User} from "../entity/User";
import firebase from "../utils/client";
import {Patient} from "../entity/Patient";

function onAuthStateChange(callback: (IUserContext) => void) {
    return firebase.auth().onAuthStateChanged(async credentialUser => {
        if (credentialUser) {
            const accessToken = await credentialUser.getIdToken();
            const {displayName, refreshToken, email, uid} = credentialUser;
            callback({loggedIn: true, user: new Patient(email, accessToken, refreshToken, email, uid, displayName)});
        } else {
            callback({loggedIn: false, user: null});
        }
    });
}

function MyApp({Component, pageProps}: AppProps) {
    const [user, setUser] = useState({loggedIn: null, user: null});
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
