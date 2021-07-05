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
import {Alert, AlertIcon, FormControl, FormLabel, Grid, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure} from "@chakra-ui/react";
import {Prescription} from "../../entity/Prescription";
import {Patient} from "../../entity/Patient";
import Header from "../header";
import {useForm} from "react-hook-form";


interface PrescriptionProps {
    patientAddress: string
    medicine: string
    frequency: string
    amount: number
}


const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [patientAddress, setPatientAddress] = useState("")
    const [pharmacistAddress, setPharmacistAddress] = useState("")
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [newPrescription, setNewPrescription] = useState<boolean>(false);
    const {register, formState: {errors}, handleSubmit, getValues} = useForm<PrescriptionProps>();

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

    const createPrescription = () => {

        // add medicine to the posting prescription

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

                <>
                    <Button onClick={onOpen}>New prescription</Button>
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

            </Container>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>New Prescription</ModalHeader>
                    <ModalCloseButton/>
                    <Container p={"2rem"}>
                        <form onSubmit={handleSubmit(createPrescription)}>
                            <FormControl isInvalid={!!errors.patientAddress}>
                                <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Patient</FormLabel>
                                <Input
                                    size="md"
                                    borderRadius="6px"
                                    borderColor="gray.200"
                                    width="20rem"
                                    {...register("patientAddress", {required: true})}
                                />
                            </FormControl>
                            <FormControl isInvalid={!!errors.medicine}>
                                <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Medicine</FormLabel>
                                <Input
                                    size="md"
                                    borderRadius="6px"
                                    borderColor="gray.200"
                                    width="20rem"
                                    {...register("medicine", {required: true})}
                                />
                            </FormControl>
                            <FormControl isInvalid={!!errors.frequency}>
                                <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Frequency</FormLabel>
                                <Input
                                    size="md"
                                    borderRadius="6px"
                                    borderColor="gray.200"
                                    width="20rem"
                                    {...register("frequency", {required: true})}
                                />
                            </FormControl>
                            <FormControl isInvalid={!!errors.amount}>
                                <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Amount</FormLabel>
                                <Input
                                    size="md"
                                    borderRadius="6px"
                                    borderColor="gray.200"
                                    width="20rem"
                                    type={"number"}
                                    {...register("amount", {required: true})}
                                />
                            </FormControl>
                            <Flex mt={"2rem"}>
                                <Button m={"auto"} type={"submit"}>Create</Button>
                                <Button m={"auto"} colorScheme={"red"} onClick={onClose}>Cancel</Button>
                            </Flex>
                        </form>
                    </Container>
                </ModalContent>
            </Modal>
        </>

    )
}
export default Index;

