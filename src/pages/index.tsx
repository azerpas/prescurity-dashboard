import {
  Link,
  Text
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { GradientWrapper } from '../components/gradient'
import Header from '../components/header'

const Index = () => (
    <Container height="100vh">
        <Header/>
        <Text size="xl">
            <GradientWrapper content="Secure" colorFrom="#805AD5" colorTo="#ED64A6" number={0}>Secure</GradientWrapper>
        </Text>
        <DarkModeSwitch />
        <Footer>
            <Text>Next ❤️ Chakra</Text>
        </Footer>
    </Container>
)

export default Index
