// responsive : 

import {Flex, Heading} from "@chakra-ui/layout"
import { Container } from "../../components/Container" 
import {Footer} from '../../components/Footer'
import {SearchBox} from '../../components/SearchBox'

import { Transfer } from "../../components/Transfer"
import Header from '../../components/header'
import React from 'react'


const Index = () => (
    <Container height="100vh" bg="none" alignItems="left">

        <Header/>
        <Transfer/>
        
        <Footer></Footer>
        
    </Container>
)
    
export default Index