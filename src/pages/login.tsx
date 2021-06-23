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

function Login() {
    var res = (
        <Container height="100vh">
            <Header/>
            <Container mt="4em">
                <Heading>Login to Prescurity</Heading>
                <FormLogin/>
            </Container>
            <Divider mt="2em" borderColor="gray.600"/>
            <Flex mt="1em">Don't have an account : <Spacer/> <Link ml="0.5em">Register Here</Link></Flex>
        </Container>
    );
    const router = useRouter();
    useEffect(() => {
        if (firebase.auth().isSignInWithEmailLink(router.asPath)) {
            var email = window.localStorage.getItem('emailForSignIn');
            console.log(email);
            if (!email) {
                console.error("NO MAIL");
            }
            try {
                const userCredential = useAsync({PromiseFn:firebase.auth().signInWithEmailLink(email, router.asPath)});
                console.log(userCredential);
                window.localStorage.removeItem('emailForSignIn');
                res =  (
                    <Container height="100vh">
                        <Header/>
                        <Container mt="4em">
                            <Heading>Login to Prescurity</Heading>
                            <Text>Your are sign in with {email} </Text>
                            <Link href="/"><Button>Return to home</Button></Link>
                        </Container>
                        <Divider mt="2em" borderColor="gray.600"/>
                    </Container>
                );
            } catch (e) {
                console.log(e);
            }
        }
    },[])
    


    return res;


}

export default Login