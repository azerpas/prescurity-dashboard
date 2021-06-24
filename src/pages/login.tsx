import {
    Heading,
    Divider,
    Flex,
    Link,
    Spacer,
    Text, Button, Spinner
} from '@chakra-ui/react'

import {Container} from '../components/Container'
import Header from '../components/header'
import firebase from "firebase";
import { useRouter } from 'next/router';
import FormLogin from "../components/form";
import React, {useContext, useEffect} from 'react';
import { useState } from 'react';
import {UserContext} from "../context/user";
import {User} from "../entity/user";




function Login() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [checking, setChecking] = useState(false);
    let email: null | string = null;
    useEffect(() => {
        const signedWithLink = async () => {
            email = window.localStorage.getItem('emailForSignIn');
            if (!email){
                router.push('/login');
                setChecking(false);
            }
            try {
                const userCredential = await firebase.auth().signInWithEmailLink(email, router.asPath);
                window.localStorage.removeItem('emailForSignIn');
                setSuccess(true);
                setChecking(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (firebase.auth().isSignInWithEmailLink(router.asPath)) {
            setChecking(true);
            signedWithLink();
        }
    },[])
    
    if(checking){
        return(
            <Container height="100vh">
                <Header/>
                <Spinner size="xl" thickness="6px" />
            </Container> 
        );
    }

    return (
        <Container height="100vh">
            <Header/>
            <Container mt="4em">
                <Heading>Login to Prescurity</Heading>

                { success ? 
                    <>
                        <Text>Your are sign in with {email} </Text>
                        <Link href="/"><Button>Return to home</Button></Link>
                    </>
                    :
                    <FormLogin/>
                }
                
            </Container>
            { !success &&
                <>
                    <Divider mt="2em" borderColor="gray.600"/>
                    <Flex mt="1em">Don't have an account : <Spacer/> <Link ml="0.5em">Register Here</Link></Flex> 
                </>
            }
        </Container>
    );
}

export default Login