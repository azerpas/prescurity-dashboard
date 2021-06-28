import {FormSignUp} from "../components/form";
import {Button, Flex, Heading, Text} from "@chakra-ui/react";
import {Footer} from "../components/Footer";
import Header from "../components/header";
import React, {useEffect, useState} from "react";
import {Container} from "../components/Container";
import firebase from "firebase";
import {useRouter} from "next/router";
import Link from "next/link";

const signUp = () => {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    let email: null | string = null;
    useEffect(() => {
        const signedWithLink = async () => {
            email = window.localStorage.getItem('emailForSignUp');
            if (!email) {
                await router.push('/signUp');
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
    }, [])
    return (
        <>
            <Header/>
            <Container>
                <Heading>Sign Up to Prescurity</Heading>
                {success ?
                    <>
                        <Text>Your are sign up with {email} </Text>
                        <Link href="/"><a><Button>Return to home</Button></a></Link>
                    </>
                    :
                    <FormSignUp/>
                }

            </Container>
            <Footer/>
        </>
    )
}

export default signUp;