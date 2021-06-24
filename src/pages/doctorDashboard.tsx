import {Button, Text} from "@chakra-ui/react";
import firebase from "../utils/client";
import Header from "../components/header";
import {Footer} from "../components/Footer";
import {useContext} from "react";
import {UserContext} from "../context/user";

const Index = () => {
    const user = useContext(UserContext);
    console.log(user);
    return (
        <>
        <Header/>

        <Footer/>
        </>


    );
};

export default Index;