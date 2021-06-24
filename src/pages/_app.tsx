import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {UserContext} from "../providers/user";
import firebase from "firebase";
import User = firebase.User;
import {useContext} from "react";

function MyApp({Component, pageProps}: AppProps) {

    return (
        // TODO :
        // erreur : JSX element type 'UserContext' does not have any construct or call signatures.
        <UserContext>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext>
    )
}

export default MyApp
