import {Avatar, Box, Center, Select, Text, useDisclosure} from '@chakra-ui/react';
import {Container} from '../components/Container';
import Header from '../components/header';
import React from 'react';
import {ChevronRightIcon} from "@chakra-ui/icons";

function Patient() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return(   
    <Container>
      <Header/>
        <Text mb={2} color="gray.500">Welcome to your Prescurity patient area </Text> 
          <Center w="19em" h="500" bg="gray.100" >
            <Box gb="black" w="100%" p={4} color = "black">
              <Avatar bottom= "0em" left="20" size='xl' alignItems="center" src="https://bit.ly/broken-link" />
                <Center  h="14em" >
                  <Text  h= "12em" font-ize="lg"alignText="center">Welcome, </Text>
                </Center>
                  <Select icon={<ChevronRightIcon />} placeholder="Prescriptions" textAlign={[  'center' ]} bottom="130" />   
             </Box>
          </Center>        
      </Container>
  );
}
export default Patient