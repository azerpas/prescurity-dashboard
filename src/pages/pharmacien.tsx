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
    As

} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";
import React from 'react'


const Title = (props: { size: string, color: string, as: As, children: React.ReactNode }) => {
    return (
        <Heading as={props.as} size={props.size} color={props.color}>{props.children}</Heading>
    )
}


const Pharmacien = () => (
    <Container height="100vh" bg="none">
        <Header/>
        <Container bg="none">
            <Title as="h1" size="xl" color="grey">Welcome to your prescurity pharmacist area</Title>
            
            <Stack spacing={3}>
                <Title as="h2" size="md" color="grey">Patient area</Title>
                <Input placeholder="medium size" size="md"/>
                <Text fontSize="md">OR scan the QR code</Text>
            </Stack> 
        </Container>
    </Container>
)
    


export default Pharmacien