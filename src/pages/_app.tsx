import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {IUserContext, UserContext} from "../context/user";
import {useContext, useEffect, useState} from "react";
import {User} from "../entity/User";
import firebase from "../utils/client";
import {Patient} from "../entity/Patient";
import {initWeb3} from "../utils/web3";
import {Pharmacy} from "../entity/Pharmacy";
import {Doctor} from "../entity/Doctor";
import {Owner} from "../entity/Owner";

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


        const unsubscribe = firebase.auth().onAuthStateChanged(async credentialUser => {
            if (credentialUser) {
                const accessToken = await credentialUser.getIdToken();
                const {displayName, refreshToken, email, uid} = credentialUser;
                let currentUser: User = null;
                const [web,contract] = await initWeb3();
                const userType = await contract.methods.getUserType().call({from:user.selectedAddress});
                console.log(userType);
                if(userType==="patient"){
                    currentUser = new Patient(email, accessToken, refreshToken, email, uid, displayName)
                }else if(userType==="pharmacy"){
                    currentUser = new Pharmacy(email, accessToken, refreshToken, email, uid, displayName)
                }else if (userType === "doctor"){
                    currentUser = new Doctor(email, accessToken, refreshToken, email, uid, "speciality",displayName)
                }else if (userType === "owner"){
                    currentUser = new Owner(email, accessToken, refreshToken, email, uid,displayName)
                }
                setUser({loggedIn: true, user: currentUser,selectedAddress:user.selectedAddress});
            } else {
                setUser({loggedIn: false, user: null,selectedAddress:user.selectedAddress});
            }
        });
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
