// react
import React, {useState} from "react";

// chakra
import {Container, Text, Flex, Heading, Box} from "@chakra-ui/layout";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";


// blockchain
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {getSelectedAddress} from "../../utils/web3";

// components

import Medicine from "./Medicine"
import {Alert, AlertIcon, Grid, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {Prescription} from "../../entity/Prescription";
import {Patient} from "../../entity/Patient";
import Header from "../header";

const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {

    const [patientAddress, setPatientAddress] = useState("")
    const [pharmacistAddress, setPharmacistAddress] = useState("")
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [newPrescription, setNewPrescription] = useState<boolean>(false);


    const setContent = async (index) => {
        if (index == 0) {
            await getPrescriptions();
        } else if (index == 1) {
            await getPatients();
        }
    }

    // TODO: Fonctions pour communiquer avec la blockchain

    // pop une fenètre pour ajouter un médicament 
    const getPatients = async () => {
        // 
    }

    // TODO: Enregistrement de la prescription vers la blockchain
    const getPrescriptions = async () => {
        // si enregistré avec succès : message de validation
        // sinon : messages d'erreur

    }


    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=170%3A9169

    return (
        <>
            <Header/>
            <ul>
                {/** TODO: Éléments graphiques à ajouter */}
                <li>Consulter les X dernières prescriptions</li>
                <li>Consulter les X dernières patients</li>
                <li>Bouton pour générer une prescription</li>
            </ul>

            <Container height="100vh" bg="none">

                {
                    newPrescription ?
                        <>
                            <Flex direction={{base: "column", md: "row"}} justifyContent={{md: "space-between"}} margin="1rem" padding="1rem">
                                <Flex direction="column" alignItems="flex-start" margin={{md: "1rem"}} padding={{md: "1rem"}} marginLeft={{base: "2rem"}}>
                                    <Heading fontSize={{base: "lg", md: "xl"}} marginLeft="1rem">Informations</Heading>
                                    <Container alignItems="left" bg="none" margin="2rem">
                                        <Text fontSize={{base: "sm", md: "md"}} color="gray.700"> Patient address </Text>
                                        <Input
                                            size="md"
                                            borderRadius="6px"
                                            borderColor="gray.200"
                                            width="20rem"
                                            onChange={(e) => setPatientAddress(e.target.value)}
                                        />
                                        <Text fontSize={{base: "xs", md: "sm"}} as="u" color="gray.500">OR scan the QR code</Text>

                                    </Container>

                                    <Container alignItems="left" bg="none" margin="2rem">

                                        <Text fontSize={{base: "sm", md: "md"}} color="gray.700"> Pharmacist address</Text>
                                        <Input
                                            size="md"
                                            borderRadius="6px"
                                            borderColor="gray.200"
                                            width="20rem"
                                            onChange={(e) => setPatientAddress(e.target.value)}
                                        />
                                        <Text fontSize={{base: "xs", md: "sm"}} as="u" color="gray.500">OR scan the QR code</Text>

                                    </Container>


                                </Flex>


                                <Flex direction="column" alignItems="flex-start" margin={{md: "1rem"}} padding={{md: "1rem"}} marginLeft={{base: "2rem"}}>
                                    <Heading fontSize={{base: "lg", md: "xl"}} marginLeft="1rem" marginBottom="1rem">Medicine</Heading>

                                    <Medicine/>

                                </Flex>
                                <Button
                                    marginTop="1rem"
                                    alignSelf={{base: "center", md: "left"}}
                                    fontSize={{base: "xs", md: "sm"}}
                                >
                                    Add new medicine
                                </Button>

                            </Flex>
                            <Button colorScheme="red" onClick={()=>{setNewPrescription(false)}} margin="2rem" >Cancel</Button>
                            <Button colorScheme="blackAlpha" margin="2rem">Transfer</Button>
                        </>
                        :

                        <>
                            <Button onClick={()=>{setNewPrescription(true)}}>New prescription</Button>
                            <Tabs onChange={setContent}>
                                <TabList>
                                    <Tab w={"50%"}>Prescriptions</Tab>
                                    <Tab w={"50%"}>Patients</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Grid>
                                            {
                                                prescriptions.map((prescription: Prescription) => {

                                                })
                                            }
                                            {
                                                prescriptions.length == 0 ?
                                                    <Box>
                                                        <Alert status="warning">
                                                            <AlertIcon/>
                                                            No prescription found !
                                                        </Alert>
                                                    </Box> : ""
                                            }
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel>
                                        <Grid>
                                            {
                                                patients.map((patient: Patient) => {

                                                })
                                            }
                                            {
                                                patients.length == 0 ?
                                                    <Box>
                                                        <Alert status="warning">
                                                            <AlertIcon/>
                                                            No patient found !
                                                        </Alert>
                                                    </Box>
                                                    :
                                                    ""

                                            }
                                        </Grid>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </>
                }

            </Container>


        </>

    )
}

export default Index;

