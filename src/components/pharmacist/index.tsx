import {Box, Flex, Heading} from "@chakra-ui/layout"
import {Container} from "../Container"
import {Footer} from '../Footer'
import {Input} from "@chakra-ui/input"
import {Button} from "@chakra-ui/button"
import Header from '../../components/header'
import React, {useContext, useState} from 'react'
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {Prescription} from "../../entity/Prescription";
import CardPrescription from "../card/prescription";
import {Alert, AlertIcon, FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import {UserContext} from "../../context/user";
import {useForm} from "react-hook-form";

interface PharmacistProps {
    num: number
}

const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const [noPrescriptions, setNoPrescriptions] = useState<boolean>(false);
    const [prescritions, setPrescriptions] = useState<Prescription[]>([]);
    const {register, formState: {errors}, handleSubmit, getValues} = useForm<PharmacistProps>();
    const context = useContext(UserContext);
    const getPrescriptions = async () => {
        setNoPrescriptions(false);
        try {
            const response = await contrat.methods.showPrescriptionPatient(getValues("num")).call({from: context.selectedAddress});
            var res: Prescription[] = [];
            for (var i = 0; i < response.length; i++) {
                const presc = response[i];
                var doctor = await contrat.methods.getDoctor(parseInt(presc.doctorId)).call({from: context.selectedAddress});
                var patient = await contrat.methods.getPatient(parseInt(presc.patientId)).call({from: context.selectedAddress});
                var temp = {...presc, doctor: doctor, patient: patient}
                res.push(Prescription.makePrescriptionWithArray(temp));
            }
            setNoPrescriptions(response.length == 0);
            setPrescriptions(res);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Container height="100vh" bg="none" alignItems="left">
            <Header/>
            <Flex direction="column" margin="1rem" align="center">
                <Heading textAlign="center"> Welcome to your pharmacist's area</Heading>
                <form onSubmit={handleSubmit(getPrescriptions)}>
                    <FormControl mt={"2rem"} bg={"none"} isInvalid={!!errors.num}>
                        <Flex flexDirection={"column"} experimental_spaceY={"3"}>
                            <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700"> Patient number 🏥</FormLabel>
                            <Input size="md" borderRadius="6px" borderColor="gray.200" width="20rem" {...register("num", {required: true, pattern: /[0-9]{15}/im})}/>
                            <FormErrorMessage>
                                {errors.num?.type === "pattern" && "Format du numero invalide"}
                                {errors.num?.type === "required" && "Entrez votre numero"}
                                {!["pattern", "required"].includes(errors.num?.type) && errors.num?.message}
                            </FormErrorMessage>
                            <Button mt={"1rem"} type={"submit"}>Show prescriptions</Button>
                            {
                                noPrescriptions ?
                                    <Box>
                                        <Alert status="warning">
                                            <AlertIcon/>
                                            No prescription found !
                                        </Alert>
                                    </Box>
                                    :
                                    prescritions.map((prescription: Prescription) => {
                                        return <CardPrescription prescription={prescription} contrat={contrat}/>
                                    })
                            }
                        </Flex>
                    </FormControl>
                </form>
            </Flex>
            <Footer/>
        </Container>
    );
}

export default Index