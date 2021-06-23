import {
    Box,
    Button,
    chakra,
    Flex, 
    Grid,
    Heading,
    Link,
    SimpleGrid,
    Text,
    Center,
    Square,
    
    


} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";
//import CardPatient from "../components/CardPatient"
import { Select } from "@chakra-ui/react"
//import { Flex, Spacer } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"

function Patient() {
 return(
<Container>
    <Header/>
              
    <Text font-size="20px" color="gray.500">Welcome to your Prescurity patient area </Text> 
    
    <Box gb="black" w="100%" p={4} color = "black"> </Box>
    
    <Flex color="black">
    
    <Center w="300px" h='500' bg="gray.100">
    
    <Box gb="black" w="100%" p={4} color = "black">
    
    <Center  h="100px" >
    <Avatar  size='xl' alignItems="center" src="https://bit.ly/broken-link" />
    </Center>

    <Center  h="100px" >
    <Text  font-size="lg"alignText="center">Welcome, </Text>
    </Center>
    <Grid h="1px" p="0em" w="16em" border='1px' ></Grid>
    <Select placeholder="Prescriptions" >  </Select>
    <Select placeholder="QR Code">        </Select>

    </Box>
    </Center>   
    </Flex>       
    </Container>

);

 

}
export default Patient