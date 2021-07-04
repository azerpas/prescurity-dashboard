import React, {useContext, useEffect} from "react";
import {useState} from "react";
import {Button, Text, useDisclosure, Avatar, Grid, Spacer, Container} from "@chakra-ui/react";
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import Header from "../header";
import {ChevronRightIcon} from "@chakra-ui/icons";
import {Flex, Heading} from "@chakra-ui/layout";
import {Prescription} from "../../entity/Prescription";
import {UserContext} from "../../context/user";
import CardPrescription from "../card/prescription";
import {Patient} from "../../entity/Patient";
import {Doctor} from "../../entity/Doctor";
import { truncate } from "fs/promises";

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toTimeString();
}




const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    // TODO: Fonctions pour communiquer avec la blockchain
    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=114%3A3
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [prescriptionSelected, setPrescriptionSelected] = useState(false)
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const context = useContext(UserContext);

    useEffect(() => {
        const getPrescriptions = async () => {
            const response = await contrat.methods.showPrescriptionPatient(context.user.uid).call({from: context.selectedAddress});
            var res: Prescription[] = [];
            for (var i = 0; i < response.length; i++) {
                const presc = response[i];
                var doctor = await contrat.methods.getDoctor(parseInt(presc.doctorId)).call({from: context.selectedAddress});
                var temp = {...presc, doctor: doctor , patient : context.user}
                res.push(Prescription.makePrescriptionWithArray(temp));
            }
            setPrescriptions(res);
        }

        getPrescriptions()
    }, [])
    return (
        <>
            <Header/>
            <Heading mb={"2rem"} textAlign={"center"} color="gray.500" fontSize={{ base: "25px", md: "32px", lg: "48px" }} >Welcome to your Prescurity patient area </Heading>
            <Flex flexWrap="wrap">
                <Flex mx={"auto"} bg="gray.100" p={"2rem"} w={[250, 350, 500]} alignSelf={"flex-start"} flexDirection="column" mt="6.5rem">
                    <Avatar size='xl' src="https://bit.ly/broken-link" m={"auto"}/>
                    <Text fontSize={"lg"} textAlign="center" mb={"2rem"}>Welcome {context.user.name} </Text>
                    <Button mb={"2rem"} border={"1px grey solid"} isActive={prescriptionSelected} onClick={() => {
                        setPrescriptionSelected(true)
                    }}>
                        <Text m={'auto'}>Prescriptions</Text> <ChevronRightIcon/>
                    </Button>
                    <Button mb={"2rem"} border={"1px grey solid"} isActive={!prescriptionSelected} onClick={() => {
                        setPrescriptionSelected(false)
                    }}>
                        <Text m={'auto'}>QR code</Text> <ChevronRightIcon/>
                    </Button>
                </Flex>
            {
                prescriptionSelected ?
                <>
                <Container h={"100%"} if prescriptionSelected ={true}>
                    <Heading fontSize={"xl"} alignText="center" mb={"2rem"} mt={"2rem"}> Prescriptions</Heading>
                    <Flex direction="column" alignItems="left" justifyContent="flex-start" margin={{base: "auto", md: "1rem"}}>
                        <Container>
                        {
                            prescriptions.map((prescription: Prescription) => {
                                return <CardPrescription contrat={contrat} prescription={prescription}/>
                            })
                        }
                        </Container>
                    </Flex>
                </ Container>
                </>
                :
                <>
                </>
            }
            </Flex>
        </>
    )
}

export default Index;