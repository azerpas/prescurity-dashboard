import {FormSignUp} from "../components/form";
import {Button, Heading, Text} from "@chakra-ui/react";
import {Footer} from "../components/Footer";
import Header from "../components/header";
import React, {useContext, useEffect, useState} from "react";
import {Container} from "../components/Container";
import firebase from "firebase";
import {useRouter} from "next/router";
import Link from "next/link";
import {getSelectedAddress, initWeb3} from "../utils/web3";
import { MajorAlert } from "../components/alert";
import { AlertContext } from "../context/alert";

const signUp = () => {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState<undefined | number | string>(null);
    const [errorMetaMask, setErrorMetaMask] = useState<boolean>(false);
    const alertContext = useContext(AlertContext);
    let email: null | string = null;
    useEffect(() => {
        const signedWithLink = async () => {
            email = window.localStorage.getItem('emailForSignUp');
            if (!email) {
                await router.push('/join');
            }
            try {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
                await firebase.auth().signInWithEmailLink(email, router.asPath);
                window.localStorage.removeItem('emailForSignUp');
                setSuccess(true);
            } catch (e) {
                console.log(e);
            }
        }
        if (firebase.auth().isSignInWithEmailLink(router.asPath)) {
            signedWithLink();
        }

        const getAddress = async () => {
            try {
                setAddress(await getSelectedAddress());
            } catch (e) {
                setErrorMetaMask(true);
                console.error(e);
            }

        }
        getAddress();
    }, []);

    return (
        <>
            <Header/>
            {alertContext.title ? 
                <MajorAlert {...alertContext}/>
            : <></>}
            <Container>
                <Heading>Sign Up to Prescurity</Heading>
                {success ?
                    <>
                        <Text>Your are sign up with {email} </Text>
                        <Link href="/"><a><Button>Return to home</Button></a></Link>
                    </>
                    :
                    <FormSignUp address={address} error={errorMetaMask}/>
                }

            </Container>
            <Footer/>
        </>
    )
}

export default signUp;