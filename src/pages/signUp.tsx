import {FormSignUp} from "../components/form";
import { Flex, Heading} from "@chakra-ui/react";
import {Footer} from "../components/Footer";
import Header from "../components/header";
import React from "react";
import {Container} from "../components/Container";

const signUp = () => {
    return (
        <>
            <Header/>
            <Container >
                <Heading>Sign Up to Prescurity</Heading>
                    <FormSignUp/>
            </Container>
            <Footer/>
        </>
    )

}

export default signUp;