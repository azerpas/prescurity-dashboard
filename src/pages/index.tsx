import {Box, Button, chakra, Flex, Heading, SimpleGrid, Text} from '@chakra-ui/react'
import Link from "next/link";
import {Container} from '../components/Container'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {useContext} from "react";
import {UserContext} from "../context/user";

const Word = (props: { children: React.ReactNode }) => {
    return (
        <Text fontSize={{base: "6xl"}} fontWeight="bold">{props.children}</Text>
    );
}

const BigBlock = (props: { title: String, children: React.ReactNode, button: String }) => {
    return (
        <Flex direction={{base: "column"}} p={{base: "1rem"}} width={"70%"} margin={"auto"}>
            <Heading fontSize={{base: "lg"}} mb={{base: "1rem"}} fontWeight="bold">{props.title}</Heading>
            <Text fontSize={{base: "lg"}} mb={{base: "1rem"}}>{props.children}</Text>
            <Link href={"/dashboard"}><a><Button m={{base: "auto"}} ml={{base: "0"}} backgroundColor={{base: "black"}} color={{base: "white"}} fontWeight="bold">{props.button}</Button></a></Link>
        </Flex>
    );
}

const Index = () => {
    const iUserContext = useContext(UserContext);
    console.log(iUserContext);
    return (
        <Container height="100vh" bg="none">
            <Header/>
            <Flex direction={{base: "column", md: "row"}} textAlign="center" my={{base: "10"}}>
                <Box>
                    <Word>
                        <GradientWrapper content="Unique" colorFrom="#805AD5" colorTo="#ED64A6" number={0}>Unique</GradientWrapper>
                    </Word>
                </Box>
                <Box mx={{base: "0", md: "20"}} my={{base: "6", md: "0"}}>
                    <Word>
                        <GradientWrapper content="Secure" colorFrom="#00A3C4" colorTo="#90CDF4" number={1}>Secure</GradientWrapper>
                    </Word>
                </Box>
                <Box>
                    <Word>
                        <GradientWrapper content="Fast" colorFrom="#48BB78" colorTo="#38B2AC" number={2}>Fast</GradientWrapper>
                    </Word>
                </Box>
            </Flex>

            <Container mx={{base: "5"}} bg="none">
                <SimpleGrid columns={{sm: 1, md: 2}} spacing={{base: 3, md: 5}}>
                    <Box maxW={{md: "sm"}} mx="auto">
                        <ContractSvg width="20rem"/>
                    </Box>
                    <Box mx="3">
                        <Heading>The future of prescriptions</Heading>
                        <Text textAlign="justify">At Prescurity, we are trying to reinvent the medical prescription thanks to the blockchain technology. Our platform enables people to generate, use and archive prescription.</Text>
                    </Box>
                </SimpleGrid>
            </Container>

            <SimpleGrid columns={{sm: 1, md: 3}} mt={{base: "5"}}>
                <BigBlock title={"Doctor"} button={"I am a doctor 👨‍"}>
                    <Text>Generate a <chakra.span color={"#00A3C4"}>secured</chakra.span> and unique prescription in a few seconds </Text>
                </BigBlock>
                <BigBlock title={"Patient"} button={"I am a patient 👨‍"}>
                    <Text>Redeem your medecine digitally <chakra.span color={"#48BB78"}>in a instant</chakra.span></Text>
                </BigBlock>
                <BigBlock title={"Pharmacist"} button={"I am a pharmacist 👨‍"}>
                    <Text>Deliver the <chakra.span color={"#00A3C4"}>right goods</chakra.span> to the <Text color={"#00A3C4"}>right person</Text> </Text>
                </BigBlock>
            </SimpleGrid>
            <Footer>
                <Text>Next ❤️ Chakra ❤️ EFREI</Text>
            </Footer>
        </Container>
    );
}


export default Index
