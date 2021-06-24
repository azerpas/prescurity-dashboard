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
    
    
    
    


} from '@chakra-ui/react';
import {Container} from '../components/Container';
import {DarkModeSwitch} from '../components/DarkModeSwitch';
import {Footer} from '../components/Footer';
import {GradientWrapper} from '../components/gradient';
import Header from '../components/header';
import ContractSvg from '../components/svg/contract';
import {Span} from "next/dist/telemetry/trace";
import CardPatient from "../components/CardPatient";
import { Select } from "@chakra-ui/react";
//import { Flex, Spacer } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import React from 'react';
import { Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from "@chakra-ui/icons";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from "@chakra-ui/react";

function Patient() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return(
   <Container>
       <Header/>

       <Text font-size="20em" color="gray.500">Welcome to your Prescurity patient area </Text> 
       
       <Box gb="black" w="100%" p={5} color = "black"> </Box>
       
       <Flex color="black">
       
            <Center w="19em" h="500" bg="gray.100" >
       
                <Box gb="black" w="100%" p={4} color = "black">
        
                  <Avatar bottom= "0em" left="20" size='xl' alignItems="center" src="https://bit.ly/broken-link" />
                  
                  <Center  h="14em" >
                    <Text  h= "12em" font-ize="lg"alignText="center">Welcome, </Text>
                    </Center>

                   
                  <Select icon={<ChevronRightIcon />} placeholder="Prescriptions" textAlign={[  'center' ]} bottom="130" />
                   

                  <Button onClick={onOpen} w="17em" bottom="130"> QR Code </Button>
                  <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom"  >
                   <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>This is your QR Code </ModalHeader>
                            <ModalCloseButton />
                              <ModalBody>
           
                              </ModalBody>
                              <ModalFooter>
            
            
                              </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Box>
             </Center>   
         </Flex>  
       
            
    </Container>

  );
   
}

export default Patient
                    
   
   