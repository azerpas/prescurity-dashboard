import {ChakraProvider} from '@chakra-ui/react'

import theme from '../theme'
import {AppProps} from 'next/app'
import {IUserContext, UserContext} from "../context/user";
import {AlertContext, IAlertContext} from "../context/alert";
import {useContext, useEffect, useState} from "react";
import {User} from "../entity/User";
import firebase from "../utils/client";
import {Patient} from "../entity/Patient";
import {getSelectedAddress, initWeb3} from "../utils/web3";
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
    const [userState, setUserState] = useState({loggedIn: null, user: null, selectedAddress: null});
    const [alertState, setAlertState] = useState<IAlertContext>({title: null, description: null});
    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
            console.log(`Accounts changed triggered`)
            if (accounts.length === 0 && !userState.user) {
                console.info('Address changed but no user defined');
                return;
            } else if (accounts.length === 0 && userState.user) {
                throw new Error("Please reconnect to your account");
            } else if (accounts.length !== 0 && userState.user) {
                console.log("accountsChanged address : ", accounts[0]);
                setUserState({user: userState.user, loggedIn: userState.loggedIn, selectedAddress: accounts[0]});
                if (accounts[0] !== userState.user.name) {
                    // TODO: disconnect user
                    throw new Error("Please reconnect to your account");
                }
            }
            console.groupEnd();
            setAlertState({title: null, description: null});
        });


        const unsubscribe = firebase.auth().onAuthStateChanged(async credentialUser => {
            let selectedAddress: string | null = null;
            try {
                selectedAddress = getSelectedAddress();
            } catch (error) {
                console.error("");
                setAlertState({title: "Ethereum address not found !", description: error.message});
                return;
            }
            if (credentialUser) {
                const accessToken = await credentialUser.getIdToken();
                const {displayName, refreshToken, email, uid} = credentialUser;
                let currentUser: User = null;
                const [web, contract] = await initWeb3();
                console.log(`Getting type from selected address: ${selectedAddress}`);
                const userType = await contract.methods.getUserType().call({from: selectedAddress});
                console.log(`User type found: ${userType}`);
                if (userType === "patient") {
                    const patient = await contract.methods.getPatientAddress(selectedAddress).call({from:selectedAddress});
                    currentUser = new Patient(email, accessToken, refreshToken, email,patient.numero_secu, displayName)
                } else if (userType === "pharmacy") {
                    currentUser = new Pharmacy(email, accessToken, refreshToken, email, uid, displayName)
                } else if (userType === "doctor") {
                    currentUser = new Doctor(email, accessToken, refreshToken, email, uid, "speciality", displayName)
                } else if (userType === "owner") {
                    currentUser = new Owner(email, accessToken, refreshToken, email, uid, displayName)
                }else {
                    console.error(`No user type found, please make sure the address are set`);
                    throw new Error('No user type found, please make sure the address are set');
                }
                setUserState({selectedAddress: selectedAddress, loggedIn: true, user: currentUser});
            } else {
                console.log(`No credential found`);
                setUserState({selectedAddress: selectedAddress, loggedIn: false, user: null});
            }
        });
        onChainChange();
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={userState}>
            <ChakraProvider resetCSS theme={theme}>
                <AlertContext.Provider value={alertState}>
                    <Component {...pageProps} />
                </AlertContext.Provider>
            </ChakraProvider>
        </UserContext.Provider>
    );
}

export default MyApp
