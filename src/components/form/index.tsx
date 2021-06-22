import {
    chakra,
    Flex,
    Grid,
    useDisclosure,
    useUpdateEffect,
    HTMLChakraProps,
    FormControl,
    Input,
    FormLabel,
    Spacer,
    Link,
    Box, Button,

} from "@chakra-ui/react"
import React from "react"
import {useForm} from "react-hook-form";
import {useViewportScroll} from "framer-motion";
import firebase from "../../utils/client";
import * as url from "url";
interface LoginProps {
    email: string
}


const Form_exp = (props: HTMLChakraProps<"form">) => {
    var actionCodeSettings = {
        url: "http://localhost:3000/login",
        handleCodeInApp: true
    };
    const login = async (props: LoginProps) => {
        try {
            const user = await firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettings);
            if (user != undefined) {
                window.localStorage.setItem('emailForSignIn', props.email);
            }else{
                window.localStorage.setItem('nop', props.email);
            }
        } catch (e) {
            console.log(e);
        }
    }


    const {register, formState: {errors}, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        await login({email: data.email})
    };

    return (
        <Grid p="0.5em" w="25em" border='1px' flex-direction='column' mt="2em">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                    <FormControl id="email">
                        <FormLabel>Email adress 👤</FormLabel>
                        <Input  {...register("email")}/>
                    </FormControl>
                </Flex>
                <Flex text-align="center">
                    <Input type="submit" color="white" value="Sign In" bgColor="black"/>
                </Flex>
            </form>
        </Grid>
    );
}

export default Form_exp