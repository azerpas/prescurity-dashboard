import {Button, Divider, Flex, Heading, Spinner, Text, useToast,} from '@chakra-ui/react'
import Link from "next/link";
import {Container} from '../components/Container'
import Header from '../components/header'
import firebase from "firebase";
import {useRouter} from 'next/router';
import FormLogin from "../components/form";
import React, {useContext, useEffect, useState} from 'react';
import {PresLink} from '../components/link';
import {AlertContext} from '../context/alert';
import {MajorAlert} from '../components/alert';
import * as ROUTES from '../constants/routes';

function Login() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [checking, setChecking] = useState(false);
    const alertContext = useContext(AlertContext);
    const toast = useToast();
    let email: null | string = null;
    useEffect(() => {
        const signedWithLink = async () => {
            email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                await router.push(ROUTES.LOGIN);
                setChecking(false);
            }
            try {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credentialUser = await firebase.auth().signInWithEmailLink(email, router.asPath);
                window.localStorage.removeItem('emailForSignIn');
                setSuccess(true);
                setChecking(false);
            } catch (e) {
                toast({
                    title: "Login error",
                    description: e.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
                setChecking(false);
            }
        }
        if (firebase.auth().isSignInWithEmailLink(router.asPath)) {
            setChecking(true);
            signedWithLink();
        }
    }, [])

    if (checking) {
        return (
            <Container height="100vh">
                <Header/>
                <Spinner size="xl" thickness="6px"/>
            </Container>
        );
    }

    if (success) {
        router.push(ROUTES.DASHBOARD);
        return <></>;
    }

    return (
        <Container height="100vh">
            <Header/>
            {alertContext.title ?
                <MajorAlert {...alertContext}/>
                : <></>}
            <Container my="4rem" minH={{base: "55vh", sm: "60vh", md: "60vh"}}>
                <Heading>Login to Prescurity</Heading>

                {success ?
                    <>
                        <Text>Your are signing in with {email} </Text>
                        <Link href={ROUTES.DASHBOARD}><a><Button>Go to the dashboard</Button></a></Link>
                    </>
                    :
                    <>
                        <FormLogin/>
                        {!success &&
                        <>
                            <Divider mt="2em" borderColor="gray.600"/>
                            <Flex mt="1em"><PresLink href={"/join"}><a>Don't have an account:&nbsp;Register Here</a></PresLink></Flex>
                        </>
                        }
                    </>
                }

            </Container>
        </Container>
    );
}

export default Login