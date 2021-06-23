import {
    Flex,
    Grid,
    FormControl,
    Input,
    FormLabel, HTMLChakraProps, Heading, Text, FormErrorMessage

} from "@chakra-ui/react"
import React, {useState} from "react"
import {useForm} from "react-hook-form";
import firebase from "../../utils/client";

interface LoginProps {
    email: string
}

const actionCodeSettings = {
    url: `${process.env.DOMAIN_URL || "http://localhost:3000"}/login`,
    handleCodeInApp: true
};

const FormLogin = (props: HTMLChakraProps<"form">) => {
    // States
    const [emailSended, setEmailSended] = useState(false);
    const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm<LoginProps>();

    const login = async (props: LoginProps) => {
        try {
            const user = await firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', props.email);
            setEmailSended(true);
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.warn(errorCode, " ==> ", errorMessage);
        }
    }

    const onSubmit = async (data) => await login({email: data.email});

    return (
        <Grid p="0.5em" w="25em" border='1px' flex-direction='column' mt="2em">
            {emailSended ?
                <>
                    <Text>Un email de confirmation a été envoyé à l'adresse suivante : </Text>
                    <br/>
                    <Text><i>{ window.localStorage.getItem("emailForSignIn")}</i></Text>
                </>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex>
                        <FormControl id="email" isInvalid={errors.email ? true : false}>
                            <FormLabel>Email adress 👤</FormLabel>
                            <Input  {...register("email", { required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/im })}/>
                            <FormErrorMessage>
                                {errors.email?.type === "pattern" && "Format de l'email invalide"}
                                {errors.email?.type === "required" && "Entrez votre email"}
                                {!["pattern", "required"].includes(errors.email?.type) && errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex text-align="center" mt="3">
                        <Input type="submit" color="white" value="Sign In" bgColor="black" disabled={emailSended || isSubmitting}/>
                    </Flex>
                </form>
            }
        </Grid>
    );
}

export default FormLogin
