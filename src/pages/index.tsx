import {
    Box,
    Flex,
    Heading,
    Link,
    SimpleGrid,
    Text
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { GradientWrapper } from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'

const Index = () => (
    <Container height="100vh">
        <Header/>
        <Flex direction={{base: "column", md: "row"}} textAlign="center" my={{base: "10"}}>
            <Box>
                <Text fontSize={{base: "3xl", md: "6xl"}} fontWeight="bold">
                    <GradientWrapper content="Unique" colorFrom="#805AD5" colorTo="#ED64A6" number={0}>Unique</GradientWrapper>
                </Text>
            </Box>
            <Box mx={{base: "0", md: "20"}} my={{base: "6", md: "0"}}>
                <Text fontSize={{base: "3xl", md: "6xl"}} fontWeight="bold">
                    <GradientWrapper content="Secure" colorFrom="#00A3C4" colorTo="#90CDF4" number={1}>Secure</GradientWrapper>
                </Text>
            </Box>
            <Box>
                <Text fontSize={{base: "3xl", md: "6xl"}} fontWeight="bold">
                    <GradientWrapper content="Fast" colorFrom="#48BB78" colorTo="#38B2AC" number={2}>Fast</GradientWrapper> 
                </Text>
            </Box>
        </Flex>
        
        <Container mx={{base: "5"}}>
            <SimpleGrid columns={{sm: 1, md: 2}} spacing={{base: 3, md: 5}} >
                <Box maxW={{md: "sm"}} mx="auto">
                    <ContractSvg width="20rem"/>
                </Box>
                <Box mx="3">
                    <Heading>The future of prescriptions</Heading>
                    <Text textAlign="justify">At Prescurity, we are trying to reinvent the medical prescription thanks to the blockchain technology. Our platform enables people to generate, use and archive prescription.</Text>
                </Box>
            </SimpleGrid>
        </Container>
        <DarkModeSwitch />
        <Footer>
            <Text>Next ❤️ Chakra ❤️ EFREI</Text>
        </Footer>
    </Container>
)

export default Index
