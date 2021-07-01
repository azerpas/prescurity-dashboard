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


interface PharmacistProps  {
    num: number
}
const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const [prescritions, setPrescriptions] = useState<Prescription[]>([]);
    const {register, formState: {errors}, handleSubmit, getValues} = useForm<PharmacistProps>();
    const context = useContext(UserContext);
    const getPrescriptions = async () => {
        const [web, contract] = await initWeb3();
        try {
            const response = await contract.methods.showPrescriptionPatient(getValues("num")).call({from: getValues("num")});
            console.log(response);
        }catch (e){
            console.error('%c ' + e ,  'background: #222; color: #ff0000');
        }

        setPrescriptions([]);
    }
    return (
        <Container height="100vh" bg="none" alignItems="left">
            <Header/>
            <Flex direction="column" margin="1rem" align="center">
                <Heading textAlign="center"> Welcome to your Prescurity pharmacist's area</Heading>
                <form onSubmit={handleSubmit(getPrescriptions)} >
                    <FormControl mt={"2rem"} bg={"none"} isInvalid={errors.num ? true : false}>
                        <Flex flexDirection={"column"} experimental_spaceY={"3"}>
                            <FormLabel fontSize={{base: "sm", md: "md"}} color="gray.700"> Patient number 🏥</FormLabel>
                            <Input size="md" borderRadius="6px" borderColor="gray.200" width="20rem"
                                   {...register("num", {required: true, pattern: /[0-9]{15}/im})}
                            />
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
                <Container m={"auto"}>
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