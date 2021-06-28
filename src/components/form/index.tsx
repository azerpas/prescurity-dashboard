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
import {base64} from "ethers/lib/utils";
import {toBase64} from "next/dist/next-server/lib/to-base-64";
import {BiMessageError} from "react-icons/all";

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



interface SignUpProps {
    email: string,
    name:string,
    numSecu:number
}

const actionCodeSettingsSignUp = {
    url: `${process.env.DOMAIN_URL || "http://localhost:3000"}/signUp`,
    handleCodeInApp: true
};

export const FormSignUp = (props: HTMLChakraProps<"form">) => {
    // States
    const [emailSended, setEmailSended] = useState(false);
    const [errorExist, setErrorExist] = useState(false);
    const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm<SignUpProps>();

    const signUp = async (props: SignUpProps) => {
        try {
            const userDB =  await firebase.database().ref('users').child(toBase64(props.email)).get();
            if(userDB.exists()){
                console.log("ERROR EXIST")
                setErrorExist(true);
            }else{
                const user = await firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettingsSignUp);
                window.localStorage.setItem('emailForSignUp', props.email);
                console.log(toBase64(props.email));
                await firebase.database().ref('users/' +toBase64(props.email)).set({
                    name: props.name,
                    numSecu: props.numSecu,
                    valid: false
                });
                setEmailSended(true);
            }

        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.warn(errorCode, " ==> ", errorMessage);
        }
    }

    const onSubmit = async (data) => await signUp({email: data.email,name:data.name,numSecu:data.numSecu});

    return (
        <Grid p="0.5em" w="25em" border='1px' flex-direction='column' mt="2em">
            {emailSended ?
                <>
                    <Text>Un email de confirmation a été envoyé à l'adresse suivante : </Text>
                    <br/>
                    <Text><i>{ window.localStorage.getItem("emailForSignUp")}</i></Text>
                </>
                :
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Flex flexDirection={"column"}>
                        <FormControl id="nom" isInvalid={errors.name ? true : false}>
                            <FormLabel>Name 👤</FormLabel>
                            <Input  {...register("name", { required: true})}/>
                            <FormErrorMessage>
                                {errors.name?.type === "required" && "Entrez votre nom"}
                                {!["required"].includes(errors.name?.type) && errors.name?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="email" isInvalid={errors.email ? true : false}>
                            <FormLabel>Email address 📧</FormLabel>
                            <Input  {...register("email", { required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/im })}/>
                            <FormErrorMessage>
                                {errors.email?.type === "pattern" && "Format de l'email invalide"}
                                {errors.email?.type === "required" && "Entrez votre email"}
                                {!["pattern", "required"].includes(errors.email?.type) && errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="numSecu" isInvalid={errors.numSecu ? true : false}>
                            <FormLabel>Social Security Number 🏥</FormLabel>
                            <Input type={"number"} {...register("numSecu", { required: true, pattern: /[0-9]{15}/im })}/>
                            <FormErrorMessage>
                                {errors.numSecu?.type === "pattern" && "Format du numero de securité sociale invalide"}
                                {errors.numSecu?.type === "required" && "Entrez votre numéro de sécurité social"}
                                {!["pattern", "required"].includes(errors.numSecu?.type) && errors.numSecu?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    {
                        errorExist ?
                            <Text align={"center"} color={"red"} mt={"1rem"} fontWeight={"bold"} >
                                Cette adresse mail est déjà utilisée !
                            </Text> : ""
                    }
                    <Flex text-align="center" mt="3">
                        <Input type="submit" color="white" value="Sign Up" bgColor="black" disabled={emailSended || isSubmitting}/>
                    </Flex>
                </form>
            }
        </Grid>
    );
}


export default FormLogin;