import React, {useContext, useState} from "react";
import {Prescription} from "../../../entity/Prescription";
import {Box} from "@chakra-ui/layout";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Badge, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import {Contract} from "web3-eth-contract";
import {UserContext} from "../../../context/user";
import {UserType} from "../../../types/user";


const Index = ({prescription, contrat}: { prescription: Prescription, contrat: Contract }) => {
    const userData = useContext(UserContext);
    const [userType, setUserType] = useState<undefined | UserType>();
    const [isPaid, setIsPaid] = useState<boolean>(prescription.paid);
    const [isClaimed, setIsClaimed] = useState<boolean>(prescription.claimed);

    const claimPrescription = async () => {
        try {
            const response = await contrat.methods.claimPrescription(prescription.id).send({from: userData.selectedAddress});
            setIsClaimed(true);
        } catch (e) {
            console.log(e);
        }
    }

    const getUserType = async () => {
        const type = await contrat.methods.getUserType().call({from: userData.selectedAddress});
        setUserType(type);

    }

    const payPrescription = async () => {
        try {
            // FIXME : RPC Error: Invalid parameters: must provide an Ethereum address
            const response = await contrat.methods.payPrescription(prescription.id).send({from: userData.selectedAddress});
            setIsPaid(true);
        } catch (e) {
            console.log(e);
        }
    }
    getUserType();
    return (
        <Box border="1px solid rgba(0, 0, 0, 0.08)" p={3} mt={"1rem"}>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <SimpleGrid columns={{base: 1, sm: 4}} w={"100%"} spacingX={"5"}>
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
                                    isPaid ?
                                        (isClaimed ? <Badge m={"auto"} colorScheme="green">Claimed</Badge> : <Badge m={"auto"}>Not claimed</Badge>)
                                        :
                                        <Badge m={"auto"} colorScheme="red">Not paid</Badge>
                                    // TODO: Add a "step indicator", ex: Not claimed (Step 2/3)
                                }
                            </Box>
                        </SimpleGrid>
                    </AccordionButton>
                    <AccordionPanel>
                        <Heading textAlign="center">...</Heading>
                        <Heading size="sm" mb="1">Details</Heading>
                        <SimpleGrid columns={{base: 1, sm: (!isClaimed && (userType === UserType.patient && !isPaid) || (userType === UserType.pharmacy && isPaid) ? 4 : 3)}} textAlign={{base: "center", sm: "left"}} spacingX={"5"}
                                    spacingY={"5"}>
                            <Box>
                                <Heading fontSize="sm" mb={"0.7rem"}>Disease</Heading>
                                <Text fontSize="sm">{prescription.disease}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm" mb={"0.7rem"}>Medecine</Heading>
                                <Text fontSize="sm">{prescription.medicine}</Text>
                            </Box>
                            <Box>
                                <Heading fontSize="sm" mb={"0.7rem"}>Frequency</Heading>
                                <Text fontSize="sm">{prescription.frequency}</Text>
                            </Box>
                            {
                                console.group(prescription.medicine,userType)

                            }
                            {
                                console.log("claimed",isClaimed)

                            }
                            {
                                console.log("paid",isPaid)
                            }
                            {
                                console.log("afficher pay : " , userType === UserType.patient && !isClaimed && !isPaid)
                            }
                            {
                                console.groupEnd()

                            }
                            {
                                userType === UserType.patient && !isClaimed && !isPaid ?
                                    <Box>
                                        <Heading fontSize="sm" mb={"0.7rem"}>Actions</Heading>
                                        <Button fontSize="sm" onClick={payPrescription} size="xs" isFullWidth>Pay</Button>
                                    </Box>
                                    :
                                    <>
                                    </>
                            }

                            {
                                userType === UserType.pharmacy && !isClaimed && isPaid ?
                                    <>
                                        <Box>
                                            <Heading fontSize="sm" mb={"0.7rem"}>Actions</Heading>
                                            <Button fontSize="sm" onClick={claimPrescription} size="xs" isFullWidth>Claim</Button>
                                        </Box>
                                    </> :
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