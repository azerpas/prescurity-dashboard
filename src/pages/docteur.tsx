import {
    Box,
    Button,
    chakra,
    Flex, Grid,
    Heading,
    Link,
    SimpleGrid,
    Text
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
    <Container>
        <Header/>
    </Container>
)
    
}

export default Docteur