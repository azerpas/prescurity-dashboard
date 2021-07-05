import {Alert, AlertIcon, AlertTitle, CloseButton, Flex, FormControl, FormErrorMessage, FormLabel, Grid, HTMLChakraProps, Input, Text, useToast} from "@chakra-ui/react"
import React, {useContext, useState} from "react"
import {useForm} from "react-hook-form";
import {AlertContext} from "../../context/alert";
import firebase from "../../utils/client";
import {initWeb3} from "../../utils/web3";


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
    const [errorUserExist, setErrorUserExist] = useState(false);
    const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm<LoginProps>();
    const alertContext = useContext(AlertContext);

    const login = async (props: LoginProps) => {
        try {
            const response = await fetch("/api/user?email=" + props.email, {
                method: "GET"
            });
            if (!response.ok) {
                console.error(response);
            } else {
                const dataApi = await response.json();
                if (dataApi.userExist) {
                    const user = await firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettings);
                    window.localStorage.setItem('emailForSignIn', props.email);
                    setEmailSended(true);
                } else {
                    setErrorUserExist(true);
                }
            }

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
                    <Text><i>{window.localStorage.getItem("emailForSignIn")}</i></Text>
                </>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex>
                        <FormControl id="email" isInvalid={errors.email ? true : false}>
                            <FormLabel>Email adress 👤</FormLabel>
                            <Input  {...register("email", {required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/im})}/>
                            <FormErrorMessage>
                                {errors.email?.type === "pattern" && "Format de l'email invalide"}
                                {errors.email?.type === "required" && "Entrez votre email"}
                                {!["pattern", "required"].includes(errors.email?.type) && errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    {
                        errorUserExist ?
                            <Text align={"center"} color={"red"} mt={"1rem"} fontWeight={"bold"}>
                                Cette adresse mail ne correpond à aucun compte !
                            </Text> : ""
                    }
                    <Flex text-align="center" mt="3">
                        <Input type="submit" color="white" value={alertContext.title ? alertContext.title : "Sign in"} bgColor={alertContext.title ? "red" : "black"}
                               disabled={emailSended || isSubmitting || alertContext.title === "Browser not compatible" || alertContext.title === "Ethereum address not found"}/>
                    </Flex>
                </form>
            }
        </Grid>
    );
}


interface SignUpProps {
    email: string,
    name: string,
    numSecu: number,
    address: string
}

const actionCodeSettingsSignUp = {
    url: `${process.env.DOMAIN_URL || "http://localhost:3000"}/join`,
    handleCodeInApp: true
};

export const FormSignUp = (props) => {
    const [emailSended, setEmailSended] = useState(false);
    const [errorExist, setErrorExist] = useState(false);
    const [errorExistBC, setErrorExistBC] = useState(false);
    const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm<SignUpProps>();
    const alertContext = useContext(AlertContext);
    const toast = useToast();
    const signUp = async (props: SignUpProps) => {
        try {
            const response = await fetch("/api/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(props)
            });
            const dataApi = await response.clone().json()
            if (!response.ok) {
                if (dataApi.userExist) setErrorExist(true);
                else throw new Error(dataApi.message);
            } else {
                const dataApi = await response.json()
                try {
                    const user = await firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettingsSignUp);
                    const [web, contract] = await initWeb3();
                    const response = await contract.methods.addPatient(props.numSecu, props.address).send({from: props.address});
                    setErrorExistBC(false);
                    window.localStorage.setItem('emailForSignUp', props.email);
                    setEmailSended(true);
                } catch (e) {
                    setErrorExistBC(true);
                }
            }
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.warn(errorCode, " ==> ", errorMessage);
            toast({
                title: "Sign up error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const onSubmit = async (data) => await signUp({email: data.email, name: data.name, numSecu: data.numSecu, address: props.address});

    return (
        <Grid p="0.5em" w="25em" border='1px' flex-direction='column' mt="2em">
            {emailSended ?
                <>
                    <Text>Un email de confirmation a été envoyé à l'adresse suivante : </Text>
                    <br/>
                    <Text><i>{window.localStorage.getItem("emailForSignUp")}</i></Text>
                </>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        props.error ?
                            <Alert status="error" mb={"1rem"}>
                                <AlertIcon/>
                                <AlertTitle mr={2}>Veuillez vous connecter à MetaMask !</AlertTitle>
                                <CloseButton position="absolute" right="8px" top="8px"/>
                            </Alert>
                            : ""
                    }
                    <Flex flexDirection={"column"}>
                        <FormControl id="nom" isInvalid={!!errors.name} mb={"1rem"}>
                            <FormLabel>Name 👤</FormLabel>
                            <Input  {...register("name", {required: true})}/>
                            <FormErrorMessage>
                                {errors.name?.type === "required" && "Entrez votre nom"}
                                {!["required"].includes(errors.name?.type) && errors.name?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="email" isInvalid={!!errors.email} mb={"1rem"}>
                            <FormLabel>Email address 📧</FormLabel>
                            <Input  {...register("email", {required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/im})}/>
                            <FormErrorMessage>
                                {errors.email?.type === "pattern" && "Format de l'email invalide"}
                                {errors.email?.type === "required" && "Entrez votre email"}
                                {!["pattern", "required"].includes(errors.email?.type) && errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="numSecu" isInvalid={!!errors.numSecu} mb={"1rem"}>
                            <FormLabel>Social Security Number 🏥</FormLabel>
                            <Input type={"number"} {...register("numSecu", {required: true, pattern: /[0-9]{15}/im , maxLength:15})}/>
                            <FormErrorMessage>
                                {(errors.numSecu?.type === "pattern" || errors.numSecu?.type === "maxLength" )&& "Format du numero de securité sociale invalide"}
                                {errors.numSecu?.type === "required" && "Entrez votre numéro de sécurité social"}
                                {!["maxLength","pattern", "required"].includes(errors.numSecu?.type) && errors.numSecu?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>ETH address 💳</FormLabel>
                            <Input disabled value={props.address}/>
                        </FormControl>
                    </Flex>
                    {
                        errorExist ?
                            <Alert status={"error"} mt={"1rem"}>
                                <AlertIcon/>Cette adresse mail est déjà utilisée !
                            </Alert> : ""
                    }
                    {
                        errorExistBC ?
                            <Alert status={"error"} mt={"1rem"}>
                                <AlertIcon/>Ce numero de securité social est déjà utilisé !
                            </Alert> : ""
                    }
                    <Flex text-align="center" mt="3">
                        <Input type="submit" color="white" value={alertContext.title ? alertContext.title : "Join Prescurity"} bgColor={alertContext.title ? "red" : "black"}
                               disabled={emailSended || isSubmitting || props.error || alertContext.title === "Browser not compatible" || alertContext.title === "Ethereum address not found"}/>
                    </Flex>
                </form>
            }
        </Grid>
    );
}


export default FormLogin;