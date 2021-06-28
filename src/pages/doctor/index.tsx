// commit

import { Container } from "../../components/Container" 
import {Footer} from '../../components/Footer'
import { PostPrescription } from "../../components/PostDoc/PostPrescription"
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