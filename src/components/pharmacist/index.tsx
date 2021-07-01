import {Flex, Heading, Text, Box} from "@chakra-ui/layout"
import {Container} from "../Container"
import {Footer} from '../Footer'
import {Input} from "@chakra-ui/input"
import {Button} from "@chakra-ui/button"
import Header from '../../components/header'
import React, {useContext, useState} from 'react'
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {initWeb3} from "../../utils/web3";
import {Prescription} from "../../entity/Prescription";
import CardPrescription from "../card/prescription";
import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import {UserContext} from "../../context/user";
import {useForm} from "react-hook-form";
import {Doctor} from "../../entity/Doctor";
import {Patient} from "../../entity/Patient";
import {randomInt} from "crypto";


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toTimeString();
}

interface PharmacistProps {
    num: number
}

const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const [prescritions, setPrescriptions] = useState<Prescription[]>([]);
    const {register, formState: {errors}, handleSubmit, getValues} = useForm<PharmacistProps>();
    const context = useContext(UserContext);
    const getPrescriptions = async () => {

        try {
            console.log(contrat.methods);
            const response = await contrat.methods.showPrescriptionPatient(getValues("num")).call({from: context.selectedAddress});
            console.log(response);
            setPrescriptions([]);
        } catch (e) {
            console.log(e);
        }
        /*const doctor = new Doctor('doctor',"accessToken","refreshToken","doctor@doctor.com","1234","généraliste","0x24687346");
        const patient = new Patient('patient',"accessToken","refreshToken","patient@patient.com","4321","0x6873468");
        const prescriptions: Prescription[] = [];
        for (var i = 0 ; i  < 10 ; i++){
            prescriptions.push(new Prescription(i,patient,doctor,"covid-"+i,"medic1;medic2,medic3",i+"/J",randomDate(new Date(2012, 0, 1), new Date()),randomDate(new Date(2012, 0, 1), new Date()),!!Math.floor(Math.random() * 2),!!Math.floor(Math.random() * 2)))

        }*/
    }
    return (
        <Container height="100vh" bg="none" alignItems="left">
            <Header/>
            <Flex direction="column" margin="1rem" align="center">
                <Heading textAlign="center"> Welcome to your Prescurity pharmacist's area</Heading>
                <form onSubmit={handleSubmit(getPrescriptions)}>
                    <FormControl mt={"2rem"} bg={"none"} isInvalid={errors.num ? true : false}>
                        <Flex flexDirection={"column"} experimental_spaceY={"3"}>
                            <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700"> Patient number 🏥</FormLabel>
                            <Input size="md" borderRadius="6px" borderColor="gray.200" width="20rem" {...register("num", {required: true, pattern: /[0-9]{15}/im})}/>
                            <FormErrorMessage>
                                {errors.num?.type === "pattern" && "Format du numero invalide"}
                                {errors.num?.type === "required" && "Entrez votre numero"}
                                {!["pattern", "required"].includes(errors.num?.type) && errors.num?.message}
                            </FormErrorMessage>
                            <Button mt={"1rem"} type={"submit"}>Show prescriptions</Button>
                        </Flex>
                    </FormControl>
                </form>
            </Flex>
            <Flex direction="column" alignItems="left" justifyContent="flex-start" margin={{base: "auto", md: "1rem"}}>
                <Container m={{base: "0", md: "0"}} bg={"none"}>
                    {
                        prescritions.map((prescription: Prescription) => {
                            return <CardPrescription prescription={prescription}/>
                        })
                    }
                </Container>
            </Flex>

            <Footer/>

        </Container>
    );
}

export default Index