import {
    Heading,
    Divider,
    Flex,
    Link,
    Spacer,
    Text, Button
} from '@chakra-ui/react'

import {Container} from '../components/Container'
import Header from '../components/header'
import firebase from "firebase";
import { useRouter } from 'next/router';
import { useAsync } from "react-async"
import FormLogin from "../components/form";
import { useEffect } from 'react';
import { useState } from 'react';

function Login() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    let email: null | string = null;
    useEffect(() => {
        const signedWithLink = async () => {
            email = window.localStorage.getItem('emailForSignIn');
            if (!email) console.error("NO MAIL");
            try {
                const userCredential = await firebase.auth().signInWithEmailLink(email, router.asPath);
                console.log(userCredential);
                window.localStorage.removeItem('emailForSignIn');
            } catch (e) {
                console.log(e);
            }
        }
        if (firebase.auth().isSignInWithEmailLink(router.asPath)) {
            signedWithLink();
        }
    },[])
    
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