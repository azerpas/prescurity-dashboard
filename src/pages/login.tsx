import {
    Heading,
    Divider,
    Flex,
    Spacer,
    Text, Button, Spinner,
} from '@chakra-ui/react'
import Link from "next/link";
import {Container} from '../components/Container'
import Header from '../components/header'
import firebase from "firebase";
import { useRouter } from 'next/router';
import FormLogin from "../components/form";
import React, {useEffect} from 'react';
import { useState } from 'react';
import { PresLink } from '../components/link';

function Login() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [checking, setChecking] = useState(false);
    let email: null | string = null;
    useEffect(() => {
        const signedWithLink = async () => {
            email = window.localStorage.getItem('emailForSignIn');
            if (!email){
                await router.push('/login');
                setChecking(false);
            }
            try {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credentialUser = await firebase.auth().signInWithEmailLink(email, router.asPath);
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
            <Container my="4rem" minH={{base: "55vh", sm: "60vh", md: "60vh"}}>
                <Heading>Login to Prescurity</Heading>

                { success ? 
                    <>
                        <Text>Your are sign in with {email} </Text>
                        <Link href="/"><a><Button>Return to home</Button></a></Link>
                    </>
                    :
                    <>
                        <FormLogin/>
                        { !success &&
                            <>
                                <Divider mt="2em" borderColor="gray.600"/>
                                <Flex mt="1em">Don't have an account:&nbsq;<PresLink href={"/signUp"}><a>Register Here</a></PresLink></Flex>
                            </>
                        }
                    </>
                }
                
            </Container>
        </Container>
    );
}

export default Login