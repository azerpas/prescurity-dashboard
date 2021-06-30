import React from "react";
import { useState } from "react";
import { Container, Button, Input, Text, useDisclosure, Avatar, Box, Center, Select } from "@chakra-ui/react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";
import Header from "../header";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {
    // TODO: Fonctions pour communiquer avec la blockchain
    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=114%3A3
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <ul>
                {/** TODO: Éléments graphiques à ajouter */}
                <li>Consulter les X dernières prescriptions et les payer</li>
            </ul>
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
        </>
    )
}

export default Index;