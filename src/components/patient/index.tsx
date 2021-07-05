
// chakra
import {
    Button,
    Text,
    useDisclosure,
    Avatar,
    Container,
    useClipboard,
    Center
} from "@chakra-ui/react";
import {Flex, Heading} from "@chakra-ui/layout";
import { ArrowForwardIcon } from "@chakra-ui/icons"

// react
import React, {useContext, useEffect} from "react";
import {useState} from "react";

// blockchain
import Web3 from "web3";
import {Contract} from "web3-eth-contract";

// components
import Header from "../header";
import CardPrescription from "../card/prescription";

// entity
import {Prescription} from "../../entity/Prescription";

// context
import {UserContext} from "../../context/user";


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
    const [NumsecuSelected, setNumsecuSelected] = useState(false)
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const context = useContext(UserContext);
    const value = context.user.uid
    const { hasCopied, onCopy } = useClipboard(value)


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
            console.log(res);
        }
        getPrescriptions()
    }, [])
    return (
        <>
            <Header/>
            <Heading mb={"2rem"} textAlign={"center"} color="gray.500" fontSize={{ base: "25px", md: "32px", lg: "48px" }} >Welcome to your Prescurity patient area </Heading>
            <Flex flexWrap="wrap">
                <Flex mx={"auto"} bg="gray.100" p={"2rem"} w={[250, 350, 500]} alignSelf={"flex-start"} flexDirection="column" mt={"2rem"} >
                    <Avatar size='xl' src="https://bit.ly/broken-link" m={"auto"}/>
                    <Text fontSize={"lg"} align="center" mb={"2rem"}>Welcome {context.user.name} </Text>
                    <Button mb={"2rem"} border={"1px grey solid"} isActive={prescriptionSelected} rightIcon={<ArrowForwardIcon />} onClick={() => {
                        setPrescriptionSelected(true),setNumsecuSelected(false)
                    }}>
                        <Text m={'auto'}>Prescriptions</Text> 
                    </Button>
                    <Button style={{whiteSpace: "normal",wordWrap: "break-word"}} mb={"2rem"} border={"1px grey solid"} isActive={!prescriptionSelected} rightIcon={<ArrowForwardIcon />} onClick={() => {
                        setPrescriptionSelected(false),setNumsecuSelected(true)
                    }}>
                        <Text  m={'auto'} >Numéro de sécurité sociale</Text> 
                    </Button>
                </Flex>
            {
                prescriptionSelected ?
                <>
                <Container h={"100%"} >
                    <Heading fontSize={"xl"} align="center" mb={"2rem"} mt={"2rem"}> Prescriptions</Heading>
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
            {
                NumsecuSelected ?
                <>
                <Container h={"100%"} >
                    <Heading fontSize={"xl"} align="center" mb={"2rem"} mt={"2rem"}> Numéro de sécurité sociale</Heading>
                    <Flex direction="column"  align="center" margin={{base: "auto", md: "1rem"}}>
                        <Text mt ="5rem">Your security social number : {context.user.uid}</Text>
                        <Container mt="5rem" >
                            <Center>
                            <Button  onClick={onCopy} ml={2}>
                            {hasCopied ? "Copied" : "Copy"}
                            </Button>
                            </Center>
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