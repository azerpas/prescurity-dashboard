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
    Spacer

} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";
import React from 'react'





const Pharmacien = () => (
    <Container height="100vh" bg="none">
        <Header/>
        <Flex direction="column" justify="center">
            <Box>
                <Heading as="h1" size="20px" color="#718096" font-family="Inter">Welcome to your prescurity pharmacist area</Heading>
                <Stack spacing={3} bg="">
                    <Heading as="h2" size="16px" color="#2D3748">Patient area</Heading>
                    <Input placeholder="Search ..." size="sm"/>
                    <Text as="u" fontSize="14px" color="#718096">OR scan the QR code</Text>
                </Stack> 
            </Box>
        </Flex>
            
        
    </Container>
)
    


export default Pharmacien