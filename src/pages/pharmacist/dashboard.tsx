// responsive: il y a un soucis de mise en page en mode mobile : 
// les prescriptions sortent du cadre et compresse le heading vers la gauche

import { Table, Tbody } from "@chakra-ui/table"
import {Flex, Heading, Text} from "@chakra-ui/layout"
import { Container } from "../../components/Container" 
import {Footer} from '../../components/Footer'
import {SearchBox} from '../../components/SearchBox'
import { Prescription } from '../../components/Prescription'
import { Transfer } from "../../components/Transfer"
import Header from '../../components/header'
import React from 'react'


const Dashboard = () => (
    <Container height="100vh" bg="none" alignItems="left">
        <Header/>
        <Flex direction="column" alignItems="left" justifyContent="flex-start" margin={{base:"auto", md:"1rem"}}>
            <Text padding="1rem" fontSize={{base:"md" , md:"lg"}} color="gray.700">Patient adress: xxxx@xxxx.com</Text>
            <Table > 
                <Tbody >
                    <Prescription date="XX/XX/XXXX" doctor="XXX" pharmacist="XXX"/>
                    <Prescription date="XX/XX/XXXX" doctor="XXX" pharmacist="XXX"/>
                </Tbody>
            </Table>
        </Flex>
        
        <Footer></Footer>
        
    </Container>
)
    
export default Dashboard