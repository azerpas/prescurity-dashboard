import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {IUserContext, UserContext} from "../context/user";
import {useContext, useEffect, useState} from "react";
import {User} from "../entity/User";
import firebase from "../utils/client";
import {Patient} from "../entity/Patient";

function onAuthStateChange(callback: (IUserContext) => void) {
    return firebase.auth().onAuthStateChanged(async credentialUser => {
        if (credentialUser) {
            const accessToken = await credentialUser.getIdToken();
            const {displayName, refreshToken, email, uid} = credentialUser;
            // FIXME: not necessarily "Patient" v
            var currentUser: User = null;
            // TODO : Comment récuperer l'addresse dans le userContext ? useContext(UserContext) ne peut pas être appelé ici
            // TODO : Ou est getUserType ?
            //getUserType(iUserContext.selectedAddress)
            callback({loggedIn: true, user: new Patient(email, accessToken, refreshToken, email, uid, displayName)});
        } else {
            callback({loggedIn: false, user: null});
        }
    });
}

/*const onAddressChange = ({user}: {user: User}) => {
    window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
        if(accounts.length === 0 && !user){
            console.info('Address changed but no user defined');
            return;
        }else if(accounts.length === 0 && user){
            throw new Error("Please reconnect to your account");
        }else if(accounts.length !== 0 && user){
            if(accounts[0] !== user.name){
                // TODO: disconnect user
                throw new Error("Please reconnect to your account");
            } 
        }
    });
}*/

const onChainChange = () => {
    window.ethereum.on('chainChanged', (_chainId: string) => {
        // TODO: changed chain id, alert user
        window.location.reload();
    })
}

function MyApp({Component, pageProps}: AppProps) {
    const [user, setUser] = useState({loggedIn: null, user: null, selectedAddress: null});
    useEffect(() => {

        window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
            if (accounts.length === 0 && !user.user) {
                console.info('Address changed but no user defined');
                return;
            } else if (accounts.length === 0 && user.user) {
                throw new Error("Please reconnect to your account");
            } else if (accounts.length !== 0 && user.user) {
                setUser({loggedIn: true, user: user.user, selectedAddress: accounts[0]});
                if (accounts[0] !== user.user.name) {
                    // TODO: disconnect user
                    throw new Error("Please reconnect to your account");
                }
            }
        });


        const unsubscribe = onAuthStateChange(setUser);
        onChainChange();
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
