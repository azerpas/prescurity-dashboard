import {
    Box,
    Button,
    chakra,
    Flex, Grid,
    Heading,
    Link,
    SimpleGrid,
    Text,
    Stack,
    Input
} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";

function Docteur() {
return (
    
    <Container height="100vh" bg="none">
        <Header/>
        <Flex direction="column" justify="center" height="100vh" padding="10px" align="center">
            <Box >
                <Heading as="h2" fontSize="20px" color="#718096" fontFamily="Inter" textAlign="center" marginBottom="10px">Welcome to your Prescurity doctor area</Heading>
                <Stack spacing={3} bg="none" maxW="320px" margin="auto" padding="15px">
                    <Heading as="h2" fontSize="16px" color="#2D3748" fontFamily="Inter">Patient adress</Heading>
                    <Input placeholder="Search ..." size="sm"/>
                    <Text as="u" fontSize="14px" color="#718096">OR scan the QR code</Text>
                </Stack> 
            </Box>
        </Flex>
    </Container>

)
    
}

export default Docteur