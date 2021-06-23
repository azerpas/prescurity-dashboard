import {
    Box,
    Button,
    chakra,
    Flex, Grid,
    Heading,
    Link,
    SimpleGrid,
    Text,
    Input,
    Stack,
    As,
    Spacer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    

} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";
import React from 'react'



function Datashow(props) {
    return (
            <Tr>
                <Td>Date</Td>
                <Td>Docteur</Td>
                <Td>Pharmacien</Td>
                <Td><Button colorScheme="#718096">view prescription</Button></Td>
            </Tr>
    )
}



const Prescriptions = () => (
    <Container height="100vh" bg="none" >
        <Header/>
        
         <Container height="100vh" bg="none" marginTop="10px">
            <Heading >Patient adress: xxx</Heading>
            <Table size="sm" >
                <Thead>
                    <Tr>
                        <Th >Date</Th>
                        <Th >Doctor's name</Th>
                        <Th >Pharmacist name</Th>
                        <Th > Prescrition </Th>
                    </Tr>
                </Thead>
                    <Tbody>
                        <Datashow />
                        <Datashow />
                    </Tbody>

                </Table>
            
        </Container>
        
    </Container>
)


export default Prescriptions