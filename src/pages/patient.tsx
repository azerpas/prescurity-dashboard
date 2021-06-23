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
    border,
    
    
    


} from '@chakra-ui/react'
import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import {Footer} from '../components/Footer'
import {GradientWrapper} from '../components/gradient'
import Header from '../components/header'
import ContractSvg from '../components/svg/contract'
import {Span} from "next/dist/telemetry/trace";
import CardPatient from "../components/CardPatient"
import { Select } from "@chakra-ui/react"
//import { Flex, Spacer } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import React from 'react'
import { Icon } from '@chakra-ui/react'


function Patient() {
    return(
   <Container>
       <Header/>

       <Text font-size="20em" color="gray.500">Welcome to your Prescurity patient area </Text> 
       
       <Box gb="black" w="100%" p={4} color = "black"> </Box>
       
       <Flex color="black">
       
            <Center w="19em" h='500' bg="gray.100">
       
                <Box gb="black" w="100%" p={4} color = "black">
       
                    <Center  h="0,5em" >
                    <Avatar  size='xl' alignItems="center" src="https://bit.ly/broken-link" />
                    </Center>
    
                    <Center  h="14em" >
                    <Text  h= "12em" font-ize="lg"alignText="center">Welcome, </Text>
                    </Center>
        
                    <Center  h="4rem" >
                    <Grid p="0em"  w="18rem" border='0,06rem' ></Grid>
                    </Center>

                    <Grid p="absolute"  w="21rem" h="2,375rem" border='0,06rem' borderRadius ="0,25rem" placeholder="Prescriptions" ></Grid>
                    <Select placeholder="Prescriptions ">  </Select>
                    <Select placeholder="QR Code">        </Select>

                    <Select icon={<ChevronRightIcon />} placeholder="Prescurity" />

                </Box>
            </Center>   
       </Flex>       
    </Container>

   );
   
    
   
   }

   export default Patient

   
   