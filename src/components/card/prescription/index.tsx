import React, {useContext, useState} from "react";
import {Prescription} from "../../../entity/Prescription";
import {Box} from "@chakra-ui/layout";
import {SimpleGrid, Heading, Text, Badge, IconButton, Accordion, AccordionButton, AccordionItem, AccordionPanel, Divider} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";
import {Patient} from "../../../entity/Patient"
import {Contract} from "web3-eth-contract";
import {UserContext} from "../../../context/user";
import { UserType } from "../../../types/user";
import { FaLessThanEqual } from "react-icons/fa";

const Index = ({prescription , contrat}: { prescription: Prescription , contrat:Contract }) => {
    const userData = useContext(UserContext);
    const [userType, setUserType] = useState<undefined|UserType>();
    const claimPrescription = async () => {
        const response = await contrat.methods.claimPrescription(prescription.id).send({from:userData.selectedAddress});
        console.log(response);
    

    }

    const getUserType = async () => {
        const type = await contrat.methods.getUserType().call({from: userData.selectedAddress});
        setUserType(type);

    }

    const payPrescription = async () => {
        try{
            // FIXME : RPC Error: Invalid parameters: must provide an Ethereum address
            const response = await contrat.methods.payPrescription(prescription.id).send({from:userData.selectedAddress});
            prescription.paid=true;
            console.log(response);
        }catch (e){

            console.log(e);

        }
    

    }
    getUserType();

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
                                userType === UserType.patient ?
                                (prescription.claimed ===false ?
                                (prescription.paid ===false  ?
                                    <Box>
                                        <Button fontSize="sm" onClick={payPrescription}>Pay</Button>
                                    </Box>
                                    :
                                    <>
                                    </>
                                    )
                                    :
                                    <>
                                    </>)
                                    :
                                    <>
                                    </>
                            }

                            {
                                userType === UserType.pharmacy ?
                                (prescription.claimed ===false ?
                                (prescription.paid ===false  ?
                                    <>
                                    </>
                                    :
                                    <>
                                    <Box>
                                        <Button fontSize="sm" onClick={claimPrescription}>claim</Button>
                                    </Box>
                                    </>
                                    )
                                    :
                                    <>
                                    </>)
                                    :
                                    <>
                                    </>
                            }
                            
                        </SimpleGrid>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Box>
    );
}

export default Index;