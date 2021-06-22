import {Button, Text} from "@chakra-ui/react";
import firebase from "../utils/client";

interface LoginProps {
    email: string
}

const Index = () => {


    var actionCodeSettings = {
        url: "http://localhost:3000",
        handleCodeInApp: true
    };
    const login = async (props: LoginProps) => {
        try {
            const user = await firebase.auth().sendSignInLinkToEmail(props.email, actionCodeSettings);
            console.log(user);
            if(user != undefined){
                window.localStorage.setItem('emailForSignIn', props.email);
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Button onClick={() => login({email: "martin.lenaerts@hotmail.fr"})}>Login</Button>
    )

};


export default Index;