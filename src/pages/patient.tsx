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
    useDisclosure,
    
    
    
    


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
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"

function Patient() {
  const { isOpen, onToggle } = useDisclosure();
    return(
   <Container>
       <Header/>

       <Text font-size="20em" color="gray.500">Welcome to your Prescurity patient area </Text> 
       
       <Box gb="black" w="100%" p={4} color = "black"> </Box>
       
       <Flex color="black">
       
            <Center w="19em" h="500" bg="gray.100" >
       
                <Box gb="black" w="100%" p={4} color = "black">
       
                    
                    <Avatar  bottom= "31" left="20" size='xl' alignItems="center" src="https://bit.ly/broken-link" />
                    <Text  top="23" left="20" font-size="lg"alignText="center">Welcome, </Text>
                    
                    <Select icon={<ChevronRightIcon />} placeholder="Prescurity" />
                   
                <Button onClick={onToggle} w="17em" icon={<ChevronRightIcon />}>QR Code</Button>
                <Fade in={isOpen}>
                  <Box
                    p="2rem"
                    color="black"
                    mt="2"
                    bg="white"
                    rounded="md"
                    h="200"
                    
                  >
                    
                    
                    
                  </Box>
                </Fade>

                </Box>
            </Center>   
       </Flex>  
       
            
    </Container>

   );
   
   }

   export default Patient
   //<Select icon={<ChevronRightIcon />} placeholder="QR Code" />
                    
   
   