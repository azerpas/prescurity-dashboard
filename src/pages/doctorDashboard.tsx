import {Flex, Skeleton, Text} from "@chakra-ui/react";
import Header from "../components/header";
import {Footer} from "../components/Footer";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/user";
import {Container} from "../components/Container";

const Index = () => {
    const iUserContext = useContext(UserContext);
    return (
        <>
            <Header/>
            <Flex>
                <Container border={"1px"} m={"auto"} p={"2rem"}>
                    {!iUserContext.loggedIn ?
                        <Text>Veuillez vous connecter </Text>
                        :
                        <>
                            <Text textAlign={"center"} fontWeight={"bold"}>Bonjour
                                {iUserContext.user ?
                                    iUserContext.user.name
                                    :
                                    <Skeleton height="1rem " width={"1rem"} display={"inline-block"}/>

                                } ! </Text>
                            <Text textAlign={"center"}>Vous êtes connecté avec l'adresse suivante :
                                {iUserContext.user ?
                                    " " + iUserContext.user.email
                                    :
                                    <Skeleton height="20px" mt={"1rem"}/>

                                }</Text>
                        </>
                    }
                </Container>
            </Flex>
            <Footer/>
        </>


    );
};

export default Index;