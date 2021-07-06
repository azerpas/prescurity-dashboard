import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Center, Container, InputGroup, InputRightElement, Text, useClipboard} from "@chakra-ui/react";
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import Header from "../header";
import {ArrowDownIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import {Flex, Heading} from "@chakra-ui/layout";
import {Prescription} from "../../entity/Prescription";
import {UserContext} from "../../context/user";
import CardPrescription from "../card/prescription";
import {Input} from "@chakra-ui/input";

const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    const [prescriptionSelected, setPrescriptionSelected] = useState(false)
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const context = useContext(UserContext);
    const value = context.user.uid
    const {hasCopied, onCopy} = useClipboard(value)

    useEffect(() => {
        const getPrescriptions = async () => {
            const response = await contrat.methods.showPrescriptionPatient(context.user.uid).call({from: context.selectedAddress});
            var res: Prescription[] = [];
            for (var i = 0; i < response.length; i++) {
                const presc = response[i];
                var doctor = await contrat.methods.getDoctor(parseInt(presc.doctorId)).call({from: context.selectedAddress});
                var temp = {...presc, doctor: doctor, patient: context.user}
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
            <Container>
                <Flex flexWrap="wrap" w="100%">
                    <Flex 
                        mx={"auto"} px={2} py={2} w="100%"
                        borderColor="blackAlpha.200" borderWidth={1} borderRadius={5}
                        alignSelf={"flex-start"} flexDirection="column"
                    >
                        <Avatar size='xl' src="https://bit.ly/broken-link" m={"auto"}/>
                        <Text fontSize={"sm"} mt="2" align="center">{context.user.name} </Text>
                        <Flex direction="column" align="center" w="100%" my="4">
                            <Text fontSize="sm" textAlign="center">Security social number:</Text>
                            <Flex w="100%" textAlign={"center"} alignContent={"baseline"} >
                                <InputGroup size="md">
                                    <Input isReadOnly alignSelf={"center"} value={context.user.uid} pr="4rem"/>
                                    <InputRightElement w="4rem">
                                        <Button size="sm"  alignSelf={"center"} onClick={onCopy}> {hasCopied ? "Copied" : "Copy"} </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Flex>
                        </Flex>
                        <Button mb={"2rem"} border={"1px grey solid"} isActive={prescriptionSelected} rightIcon={!prescriptionSelected ? <ArrowForwardIcon/> : <ArrowDownIcon/>} onClick={() => setPrescriptionSelected(!prescriptionSelected) }>
                            <Text m={'auto'}>Prescriptions</Text>
                        </Button>
                        {
                            prescriptionSelected ?
                            <>
                                    <Flex direction="column" alignItems="left" justifyContent="flex-start">
                                            {
                                                prescriptions.map((prescription: Prescription) => {
                                                    return <CardPrescription contrat={contrat} prescription={prescription}/>
                                                })
                                            }
                                    </Flex>
                            </>
                            :
                            <>
                            </>
                        }
                    </Flex>
                    
                </Flex>
            </Container>
        </>
    )
}

export default Index;