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
interface LoginProps {
    email: string
}


const FormLogin = (props: HTMLChakraProps<"form">) => {
    var actionCodeSettings = {
        url: "http://localhost:3000/login",
        handleCodeInApp: true
    };
    const login = async (props: LoginProps) => {
        firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', props.email);
                console.log("then")
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.warn(errorCode , " ==> " , errorMessage);
            });
    }


    const {register, formState: {errors}, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        await login({email: data.email});
        console.log("submit");
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

export default FormLogin