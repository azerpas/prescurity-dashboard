// responsive: ok

import {Flex, Heading} from "@chakra-ui/layout"
import { Container } from "../../components/Container" 
import {Footer} from '../../components/Footer'
import {SearchBox} from '../../components/SearchBox'
import { TabPrescriptions } from '../../components/TabPrescriptions'
import { Transfer } from "../../components/Transfer"
import Header from '../../components/header'
import React from 'react'


const Index = () => (
    <Container height="100vh" bg="none" alignItems="left">
        <Header/>

        <Flex direction="column"  margin="1rem" align="center">
            <Heading fontSize={{base:"20px" , md:"28px", lg:"40px" }} as="h2" color="#718096" fontFamily="Inter" textAlign="center">
            Welcome to your Prescurity pharmacist's area</Heading>
            <SearchBox type="Patient" />

        </Flex>
        
        
        <Footer></Footer>
        
    </Container>
)
    
export default Index