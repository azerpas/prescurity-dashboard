import {
    Heading,
    Divider,
    Flex,
    Link,
    Spacer
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import Header from '../components/header'
import Form_exp from '../components/form'

function Login() {
    return (
        <Container height="100vh">
            <Header />
            <Container mt="4em">
            <Heading >Login to Prescurity</Heading>
                <Form_exp />
            </Container>
            <Divider mt="2em" borderColor="gray.600"/>
            <Flex mt="1em">Don't have an account : <Spacer/> <Link ml="0.5em">Register Here</Link></Flex>
        </Container>

    );
}

export default Login