import {
  Link,
  Text
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import Header from '../components/header'

const Index = () => (
    <Container height="100vh">
        <Header/>
        <Text>
        Secure
        </Text>

        <DarkModeSwitch />
        <Footer>
            <Text>Next ❤️ Chakra</Text>
        </Footer>
    </Container>
)

export default Index
