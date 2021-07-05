// react
import React, {useContext, useEffect, useState} from "react";

// chakra
import {Container, Text, Flex, Heading, Box} from "@chakra-ui/layout";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";


// blockchain
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {getSelectedAddress} from "../../utils/web3";

// components
import {Alert, AlertIcon, FormControl, FormLabel, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure} from "@chakra-ui/react";
import {Prescription} from "../../entity/Prescription";
import {Patient} from "../../entity/Patient";
import Header from "../header";
import {useForm} from "react-hook-form";
import {UserContext} from "../../context/user";
import CardPrescription from "../card/prescription"
import CardPatient from "../card/patient"


interface PrescriptionProps {
    numSecu: string,
    medicine: string,
    frequency: string,
    amount: number,
    disease: string
}




const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [patientAddress, setPatientAddress] = useState("")
    const [pharmacistAddress, setPharmacistAddress] = useState("")
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [newPrescription, setNewPrescription] = useState<boolean>(false);
    const {register, formState: {errors}, handleSubmit, getValues, setValue} = useForm<PrescriptionProps>();
    const userData = useContext(UserContext);

    useEffect(()=>{
        setContent(0);
    })

    const setContent = async (index) => {
        if (index == 0) {
            await getPrescriptions();
        } else if (index == 1) {
            await getPatients();
        }
    }


    const getPatients = async () => {
        // TODO :
        //
        // const response = contrat.methods.getPatients(...).call({from:...})
        // for(...response) { créer tableau de patient}
        // setPatients(patients)
        
    }

    const getPrescriptions = async () => {
        // TODO :
        //
        // const response = contrat.methods.getPrescriptions(...).call({from:...})
        // for(...response) { créer tableau de prescription}
        // setPrescriptions(prescriptions)
        const response = contrat.methods.getLastDoctorPrescriptions(5).call({from:userData.selectedAddress});
        var res : Prescription[] = [];
        for (var i = 0; i < response.length; i++) {
            const presc = response[i];
            var doctor = await contrat.methods.getDoctor(parseInt(presc.doctorId)).call({from: userData.selectedAddress});
            // TODO : getPatient in Prescurity.sol
            var temp = {...presc, doctor: doctor}
            res.push(Prescription.makePrescriptionWithArray(temp));
        }
        setPrescriptions(res);
    }

    const createPrescription = async () => {
        const amount = getValues("amount");
        const frequency = getValues("frequency");
        const medicine = getValues("medicine");
        const numSecu = getValues("numSecu");
        const disease = getValues("disease");
        const res = await contrat.methods.addPrescription(amount, numSecu, medicine, disease, frequency).send({from: userData.selectedAddress});
        console.log(res);
    }

    const closeModal = () => {
        setValue("amount", null);
        setValue("frequency", "");
        setValue("medicine", "");
        setValue("numSecu", "");
        setValue("disease", "");
        onClose();
    }

    return (
        <>
            <Header/>
            <Container bg="none">
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
                                            <CardPrescription prescription={prescription} contrat={contrat}/>
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
                                            <CardPatient patient={patient} contrat={contrat}/>
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
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>New Prescription</ModalHeader>
                    <ModalCloseButton/>
                    <form onSubmit={handleSubmit(createPrescription)}>
                        <ModalBody>
                            <Container p={"2rem"} experimental_spaceY={"1rem"}>
                                <FormControl isInvalid={!!errors.numSecu}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Patient</FormLabel>
                                    <Input {...register("numSecu", {required: true})} />
                                </FormControl>
                                <FormControl isInvalid={!!errors.medicine}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Medicine</FormLabel>
                                    <Input {...register("medicine", {required: true})} />
                                </FormControl>
                                <FormControl isInvalid={!!errors.frequency}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Frequency</FormLabel>
                                    <Input {...register("frequency", {required: true})} />
                                </FormControl>
                                <FormControl isInvalid={!!errors.frequency}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Disease</FormLabel>
                                    <Input {...register("disease", {required: true})} />
                                </FormControl>
                                <FormControl isInvalid={!!errors.amount}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Amount</FormLabel>
                                    <Input {...register("amount", {required: true})} />
                                </FormControl>

                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button m={"auto"} colorScheme={"green"} type={"submit"}>Create prescription</Button>
                            <Button m={"auto"} colorScheme={"red"} onClick={closeModal}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>

    )
}
export default Index;

