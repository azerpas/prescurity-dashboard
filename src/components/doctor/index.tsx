import { Container } from "../Container" 
import {Footer} from '../Footer'
import { PostPrescription } from "./PostPrescription"
import Header from '../header'
import React from 'react'


const Doctor = () => (
    <Container height="100vh" bg="none" alignItems="left">

        <Header/>

        
        <PostPrescription/>
        
        <Footer></Footer>
        
    </Container>
)
    
export default Doctor