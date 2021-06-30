import {Flex, Heading, Text, Box} from "@chakra-ui/layout"
import { Container } from "../../components/Container" 
import {Footer} from '../../components/Footer'
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import Header from '../../components/header'
import React from 'react'
import Web3 from "web3";
import { Contract } from "web3-eth-contract";


const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {
    return(
        <Container height="100vh" bg="none" alignItems="left">
            <Header/>

            <Flex direction="column"  margin="1rem" align="center">
                <Heading fontSize={{base:"20px" , md:"28px", lg:"40px" }} as="h2" color="#718096" fontFamily="Inter" textAlign="center">
                Welcome to your Prescurity pharmacist's area</Heading>

                <Container alignItems="left" bg="none" margin="2rem" >

                    <Text fontSize={{base:"sm", md:"md"}} color="gray.700" > Patient address</Text>
                    <Input size="md" borderRadius="6px" borderColor="gray.200"  width="20rem"/>
                    <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 

                </Container>

            </Flex>

            <Container height="100vh" bg="none" alignItems="left">
            
            <Flex direction="column" alignItems="left" justifyContent="flex-start" margin={{base:"auto", md:"1rem"}}>

                <Text padding="1rem" fontSize={{base:"md" , md:"lg"}} color="gray.700">Patient adress: xxxx@xxxx.com</Text>
                


                <Flex alignContent={{base:"center" , md:"left"}} maxW="450px" alignItems="center" size={{base:"sm", md:"md"}} border="1px" borderColor="gray.700" borderRadius="4px" margin="0.2rem">
                    
                    <Box padding="0.5rem">
                        <ul><Text fontWeight="bold">Date</Text></ul>
                        <ul><Text>XX/XX/XXXX</Text></ul>
                    </Box>
                    
                    <Box padding="0.5rem">
                        <ul><Text fontWeight="bold">Doctor</Text></ul>
                        <ul><Text>Doctor's name</Text></ul>
                        
                    </Box>  
                    
                    <Box padding="0.5rem">

                        <ul><Text fontWeight="bold">Pharmacist</Text></ul>
                        <ul><Text >Pharmacist's name</Text></ul>
                    </Box>
                        
                    <Button aria-label="go to file" />

                </Flex>  

                <Flex alignContent={{base:"center" , md:"left"}} maxW="450px" alignItems="center" size={{base:"sm", md:"md"}} border="1px" borderColor="gray.700" borderRadius="4px" margin="0.2rem">
                    
                    <Box padding="0.5rem">
                        <ul><Text fontWeight="bold">Date</Text></ul>
                        <ul><Text>XX/XX/XXXX</Text></ul>
                    </Box>
                    
                    <Box padding="0.5rem">
                        <ul><Text fontWeight="bold">Doctor</Text></ul>
                        <ul><Text>Doctor's name</Text></ul>
                        
                    </Box>  
                    
                    <Box padding="0.5rem">

                        <ul><Text fontWeight="bold">Pharmacist</Text></ul>
                        <ul><Text >Pharmacist's name</Text></ul>
                    </Box>
                        
                    <Button aria-label="go to file" />

                </Flex>  


            </Flex>
            
            
            
        </Container>
        
        <Footer></Footer>
            
        </Container>
    );
}
    
export default Index