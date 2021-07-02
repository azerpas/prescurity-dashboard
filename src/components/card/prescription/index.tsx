import React, {useContext} from "react";
import {Prescription} from "../../../entity/Prescription";
import {Box} from "@chakra-ui/layout";
import {SimpleGrid, Heading, Text, Badge, IconButton, Accordion, AccordionButton, AccordionItem, AccordionPanel, Divider} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";
import {Contract} from "web3-eth-contract";
import {UserContext} from "../../../context/user";

const Index = ({prescription , contrat}: { prescription: Prescription , contrat:Contract }) => {
    const userData = useContext(UserContext);
    const claimPrescription = async () => {
        const response = await contrat.methods.claimPrescription().call({from:userData.selectedAddress});

    }

    return (
        <Box border="1px solid rgba(0, 0, 0, 0.08)" p={3} mt={"1rem"}>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton textAlign="left">
                        <SimpleGrid columns={{base: 1, sm: 4}} spacingX={"5"}>
                            <Box>
                                <Heading fontSize="sm" mb={"0.7rem"}>Date</Heading>
                                <Text fontSize="sm">{new Date(parseInt(prescription.start_timestamp)).toDateString()}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm" mb={"0.7rem"}>Docteur’s name</Heading>
                                <Text fontSize="sm">{prescription.doctor.name}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm" mb={"0.7rem"}>Pharmacy's name</Heading>
                                <Text fontSize="sm">{prescription.pharmacy ? prescription.pharmacy.name : ""}</Text>
                            </Box>
                            <Box textAlign={{base: "left", sm: "center"}} d={"flex"}>
                                {
                                    prescription.paid ?
                                        (prescription.claimed ? <Badge m={"auto"} colorScheme="green">Claimed</Badge> : <Badge m={"auto"} colorScheme="red">Not claimed</Badge>)
                                        :
                                        <Badge m={"auto"}>Not paid</Badge>
                                }
                            </Box>
                        </SimpleGrid>
                    </AccordionButton>
                    <AccordionPanel>
                        <Heading textAlign="center">...</Heading>
                        <Heading size="sm" mb="1">Details</Heading>
                        <SimpleGrid columns={{base: 1, sm: 4}} spacingX={"5"}>
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
                            {
                                prescription.claimed ? " " :
                                    <Box>
                                        <Button fontSize="sm" onClick={claimPrescription}>Claim</Button>
                                    </Box>}
                        </SimpleGrid>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Box>
    );
}

export default Index;