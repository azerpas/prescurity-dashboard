// react
import React, {useContext, useEffect, useState} from "react";

// chakra
import {Box, Container, Heading} from "@chakra-ui/layout";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";


// blockchain
import Web3 from "web3";
import {Contract} from "web3-eth-contract";

// components
import {Alert, AlertIcon, FormControl, FormErrorMessage, FormLabel, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {Prescription} from "../../entity/Prescription";
import Header from "../header";
import {useForm} from "react-hook-form";
import {UserContext} from "../../context/user";
import CardPrescription from "../card/prescription"


interface PrescriptionProps {
    numSecu: string,
    medicine: string,
    frequency: string,
    amount: number,
    disease: string
}


const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [error, setError] = useState(false);
    const {register, formState: {errors}, handleSubmit, getValues, setValue} = useForm<PrescriptionProps>();
    const userData = useContext(UserContext);

    useEffect(() => {
        getPrescriptions();
    }, [])

    const getPrescriptions = async () => {
        const response = await contrat.methods.getLastDoctorPrescriptions(7).call({from: userData.selectedAddress});
        console.log(response)
        var res: Prescription[] = [];
        for (var i = 0; i < response.length; i++) {
            const presc = response[i];
            var doctor = await contrat.methods.getDoctor(parseInt(presc.doctorId)).call({from: userData.selectedAddress});
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
        try {
            const res = await contrat.methods.addPrescription(amount, numSecu, medicine, disease, frequency).send({from: userData.selectedAddress});
            setError(false);
            await getPrescriptions();
            closeModal();
        } catch (e) {
            console.log(e);
            setError(true);
        }
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
                    <Heading mb={"1rem"}>Last Prescriptions</Heading>
                    <Box w={"100%"} textAlign={"right"} mb={"1rem"}>
                        <Button onClick={onOpen}>New prescription</Button>
                    </Box>
                    <Grid>
                        {

                            prescriptions.map((prescription: Prescription) => {
                                return <CardPrescription prescription={prescription} contrat={contrat}/>
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
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Patient Security Number</FormLabel>
                                    <Input {...register("numSecu", {required: true})} type={"number"}/>
                                    <FormErrorMessage>
                                        {errors.numSecu?.type === "required" && "Entrez un numero de securité social"}
                                        {!["required"].includes(errors.numSecu?.type) && errors.numSecu?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.medicine}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Medicine</FormLabel>
                                    <Input {...register("medicine", {required: true})} />
                                    <FormErrorMessage>
                                        {errors.medicine?.type === "required" && "Entrez un medicament"}
                                        {!["required"].includes(errors.medicine?.type) && errors.medicine?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.frequency}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Frequency</FormLabel>
                                    <Input {...register("frequency", {required: true})} />
                                    <FormErrorMessage>
                                        {errors.frequency?.type === "required" && "Entrez une frequence"}
                                        {!["required"].includes(errors.frequency?.type) && errors.frequency?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.frequency}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Disease </FormLabel>
                                    <Input {...register("disease", {required: true})} />
                                    <FormErrorMessage>
                                        {errors.disease?.type === "required" && "Entrez une maladie"}
                                        {!["required"].includes(errors.disease?.type) && errors.disease?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.amount}>
                                    <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700">Amount</FormLabel>
                                    <Input {...register("amount", {required: true})} />
                                    <FormErrorMessage>
                                        {errors.amount?.type === "required" && "Entrez un montant"}
                                        {!["required"].includes(errors.amount?.type) && errors.amount?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                {
                                    error ?
                                        <Box>
                                            <Alert status={"error"}>
                                                <AlertIcon/> Une erreur est survenue, veuillez réessayer plus tard
                                            </Alert>
                                        </Box> : ""
                                }
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

