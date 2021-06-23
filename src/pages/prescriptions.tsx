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
    TableCaption,
    propNames,

} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";
import React from 'react'

const Presc = (props: {children: React.ReactNode, date: Date, doctor: String, pharma: String}) => {
    return (
        <Tbody>
                <Tr>
                    <Td isDate>{props.date}</Td>
                    <Td isString>{props.doctor}</Td>
                    <Td isString>{props.pharma}</Td>
                    <Td><Button colorScheme="blue">view prescription</Button></Td>
                </Tr>
        </Tbody>
    )
}

const Prescriptions = () => (
    <Container bg="none">
        <Header/>
        <Heading >Patient adress: xxx</Heading>
        <Table size="sm" width={{base:"100vh", md:"50vh"}} margin="auto">
            <Thead>
                <Tr>
                    <Th >Date</Th>
                    <Th >Doctor's name</Th>
                    <Th >Pharmacist name</Th>
                    <Th > Prescrition </Th>

                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td isDate>XX/XX/XXXX</Td>
                    <Td isString>XXX</Td>
                    <Td isString>XXX</Td>
                    <Td><Button colorScheme="blue">view prescription</Button></Td>
                </Tr>
        </Tbody>
            
        </Table>
        
    </Container>
)


export default Prescriptions