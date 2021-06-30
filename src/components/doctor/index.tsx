
import React from "react";
import { useState } from "react";
import { Container, Button, Input, Text } from "@chakra-ui/react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";
import Header from "../header";

import { Flex, Box, Heading, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Container } from "../Container";
import React from 'react';
import { CloseButton } from "@chakra-ui/react"
import  AddMedicine  from "./AddMedicine"

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {


    // TODO: Fonctions pour communiquer avec la blockchain

    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=170%3A9169
    return(
        <>
            <ul>
                {/** TODO: Éléments graphiques à ajouter */}
                <li>Consulter les X dernières prescriptions</li>
                <li>Consulter les X dernières patients</li>
                <li>Bouton pour générer une prescription</li>
            </ul>

            <Container height="100vh" bg="none">

                <Flex direction={{base:"column", md:"row"}}  justifyContent={{md:"space-between"}} margin="1rem" padding="1rem">


                    <Flex direction="column" alignItems="flex-start"  margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
        
                        <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem">Informations</Heading>
        
                        <Container alignItems="left" bg="none" margin="2rem" >

                            <Text fontSize={{base:"sm", md:"md"}} color="gray.700"> Patient address </Text>
                            <Input size="md" borderRadius="6px" borderColor="gray.200"  width="20rem"/>
                            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 

                        </Container>

                        <Container alignItems="left" bg="none" margin="2rem" >

                            <Text fontSize={{base:"sm", md:"md"}} color="gray.700" > Pharmacist address</Text>
                            <Input size="md" borderRadius="6px" borderColor="gray.200"  width="20rem"/>
                            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 
            
                        </Container>
        
        
                    </Flex>


                    <Flex direction="column" alignItems="flex-start" margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
                        <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem" marginBottom="1rem" >Medicine</Heading>
        
                        <AddMedicine />
                    </Flex>  
                    <Button marginTop="1rem" alignSelf={{base:"center", md:"left"}} fontSize={{base:"xs", md:"sm"}}>Add new medicine</Button>
                </Flex>
                <Button colorScheme="blackAlpha" margin="2rem">Transfer</Button>

            </Container>
        </>
        
    )
}

export default Index;

