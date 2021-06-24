import {Button, Flex, Grid, Text} from "@chakra-ui/react";
import firebase from "../utils/client";
import Header from "../components/header";
import {Footer} from "../components/Footer";
import {useContext} from "react";
import {UserContext} from "../context/user";
import {Container} from "../components/Container";

const  Index = () => {
    const iUserContext =  useContext(UserContext);
    console.log(iUserContext);
    return (
        <>
            <Header/>
            <Flex >
                <Container  border={"1px"} m={"auto"} p={"2rem"}>
                <Text textAlign={"center"} fontWeight={"bold"}>Bonjour {iUserContext.user?.name} ! </Text>
                <Text textAlign={"center"}>Vous êtes connecté avec l'adresse suivante : {iUserContext.user?.email} </Text>
                </Container>
            </Flex>
            <Footer/>
        </>


    );
};

export default Index;