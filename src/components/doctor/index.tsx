// react
import React , { useState } from "react";

// chakra
import { Container, Text, Flex, Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";



// blockchain
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";

// components

import Medicine from "./Medicine"

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {

    const [patientAddress, setPatientAddress] = useState(null)
    const [pharmacistAddress, setPharmacistAddress] = useState(null)




    // TODO: Fonctions pour communiquer avec la blockchain

    // change la valeure entrée pour le patient
    const handlePatientAddr = (e: string) => {
        setPatientAddress(e)
    }
    // change la valeure entrée pour le pharmacien
    const handlePharmacistAddr = (e: string) => {
        setPharmacistAddress(e)
    }

    // pop une fenètre pour ajouter un médicament 
    const handleAddMedicine = () => {
        //
    }

    // TODO: Enregistrement de la prescription vers la blockchain
    const handlePrescription = () => {
        // si enregistré avec succès : message de validation
        // sinon : messages d'erreur

    }


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
                            <Input 
                                size="md" 
                                borderRadius="6px" 
                                borderColor="gray.200"  
                                width="20rem" 
                                onChange={(e) => handlePatientAddr(e)}
                            />
                            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 

                        </Container>

                        <Container alignItems="left" bg="none" margin="2rem" >

                            <Text fontSize={{base:"sm", md:"md"}} color="gray.700" > Pharmacist address</Text>
                            <Input 
                                size="md" 
                                borderRadius="6px" 
                                borderColor="gray.200"  
                                width="20rem"
                                onChange={(e) => handlePharmacistAddr(e)}
                            />
                            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 
            
                        </Container>
        
        
                    </Flex>


                    <Flex direction="column" alignItems="flex-start" margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
                        <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem" marginBottom="1rem" >Medicine</Heading>
        
                        <Medicine/>
                    </Flex>  
                    <Button marginTop="1rem" alignSelf={{base:"center", md:"left"}} fontSize={{base:"xs", md:"sm"} onClick={handleAddMedicine}}>Add new medicine</Button>
                </Flex>
                <Button colorScheme="blackAlpha" margin="2rem" onClick={handlePrescription}>Transfer</Button>

            </Container>
        </>
        
    )
}

export default Index;

