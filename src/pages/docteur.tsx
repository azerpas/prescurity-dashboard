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


function RegisterBox() {
    return (
        
            <Box spacing={3} bg="none" margin="1rem" padding="2rem"  >
                <Heading as="h2" fontSize="16px" color="#2D3748" fontFamily="Inter">Patient adress</Heading>
                <Input placeholder="Search ..." size="sm"/>
                <Text as="u" fontSize="14px" color="#718096">OR scan the QR code</Text> 
            </Box>
        
    )
}


const Doctor = () => (
    <Container height="100vh" bg="none" >
        <Header/>
        <Flex direction="column" justify="center" margin="1rem" align="center">
        <Box flex-grow="4"><Heading as="h2" fontSize="20px" color="#718096" fontFamily="Inter" textAlign="center">
            Welcome to your Prescurity doctor area</Heading></Box>
            <RegisterBox />
        </Flex>
            
    </Container>
)
    


export default Doctor