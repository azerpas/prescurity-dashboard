import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {IUserContext, UserContext} from "../context/user";
import {useState} from "react";
import {User} from "../entity/user";

function MyApp({Component, pageProps}: AppProps) {

    const [user, setUser] = useState(null);
    return (
        // TODO :
        // erreur : JSX element type 'UserContext' does not have any construct or call signatures.
        <UserContext.Provider value={{user, setUser}}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext.Provider>
    );
}

export default MyApp
