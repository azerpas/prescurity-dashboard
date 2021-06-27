// responsive : encore un leger decallage en mode mobile 
// boutons a finir aussi 

import {Flex, Heading} from "@chakra-ui/layout"
import { Container } from "../../components/Container" 
import {Footer} from '../../components/Footer'
import {SearchBox} from '../../components/SearchBox'

import { PostPrescription } from "../../components/PostPrescription"
import Header from '../../components/header'
import React from 'react'


const Index = () => (
    <Container height="100vh" bg="none" alignItems="left">

        <Header/>
        <PostPrescription/>
        
        <Footer></Footer>
        
    </Container>
)
    
export default Index