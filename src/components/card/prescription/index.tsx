import React from "react";
import { Prescription } from "../../../entity/Prescription";
import { Box } from "@chakra-ui/layout";
import { SimpleGrid, Heading, Text, Badge, IconButton, Accordion, AccordionButton, AccordionItem, AccordionPanel, Divider } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Index = ({prescription}: {prescription: Prescription}) => {
    return(
        <Box border="1px solid rgba(0, 0, 0, 0.08)" p={3}>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton textAlign="left">
                        <SimpleGrid columns={{base: 1, sm: 4}}>
                            <Box>
                                <Heading fontSize="sm">Date</Heading>
                                <Text fontSize="sm">{new Date(parseInt(prescription.start_timestamp)).toDateString()}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm">Docteur’s name</Heading>
                                <Text fontSize="sm">{prescription.doctor.name}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm">Pharmacy name</Heading>
                                <Text fontSize="sm">{prescription.pharmacy ? prescription.pharmacy.name : ""}</Text>
                            </Box>
                            <Box textAlign={{base: "left", sm: "center"}}>
                                {
                                    prescription.paid ? 
                                        (prescription.claimed ? <Badge colorScheme="green">Claimed</Badge> : <Badge colorScheme="red">Not claimed</Badge>) 
                                    : 
                                        <Badge>Not paid</Badge>
                                }
                            </Box>
                        </SimpleGrid>
                    </AccordionButton>
                    <AccordionPanel>
                        <Heading textAlign="center">...</Heading>
                        <Heading size="sm" mb="1">Details</Heading>
                        <SimpleGrid columns={{base: 1, sm: 3}}>
                            <Box>
                                <Heading fontSize="sm">Disease</Heading>
                                <Text fontSize="sm">{prescription.disease}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm">Medecine</Heading>
                                <Text fontSize="sm">{prescription.medicine}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm">Frequency</Heading>
                                <Text fontSize="sm">{prescription.frequency}</Text>
                            </Box>
                        </SimpleGrid>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            
        </Box>
    );
}

export default Index;