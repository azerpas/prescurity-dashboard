// react
import React , { useState } from "react";

// chakra
import { Container, Text, Flex, Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"



// blockchain
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";

const Index = () => {

    const [patientAddress, setPatientAddress] = useState("");
    const [pharmacistAddress, setPharmacistAddress] = useState("");
    const [medicineName, setMedicineName] = useState("")
    const [frequency, setFrequency] = useState("")

    

    // TODO: Enregistrement de la prescription vers la blockchain
    const handlePrescription = () => {
        // si enregistré avec succès : message de validation
        // sinon : messages d'erreur


    }

    return (

        <>
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
                                onChange={(e) => setPatientAddress(e)} // syntaxe non valide 
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
                                onChange={(e) => setPharmacistAddress(e)} // syntaxe non valide
                            />
                            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 
            
                        </Container>
        
        
                    </Flex>


                    <Flex direction="column" alignItems="flex-start" margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
                        <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem" marginBottom="1rem" >Medicine</Heading>
                        <Text fontSize={{base:"sm", md:"md"}} color="gray.700" >Medicine name</Text>
                        <Input 
                                size="md" 
                                borderRadius="6px" 
                                borderColor="gray.200"  
                                width="20rem" 
                                onChange={(e) => setMedicineName(e)} // syntaxe non valide
                            />
                        <Text fontSize={{base:"sm", md:"md"}} color="gray.700" >Frequency</Text>
                        <Input 
                                size="md" 
                                borderRadius="6px" 
                                borderColor="gray.200"  
                                width="20rem" 
                                onChange={(e) => setFrequency(e)} // syntaxe non valide
                            />
                        
        
                        

                    </Flex>  
                    

                </Flex>

                <Button colorScheme="blackAlpha" margin="2rem" onClick={handlePrescription}>Transfer</Button>

            </Container>

        </>
    )
}