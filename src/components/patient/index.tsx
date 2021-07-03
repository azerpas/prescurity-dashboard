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

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toTimeString();
}


const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    // TODO: Fonctions pour communiquer avec la blockchain
    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=114%3A3
    const {isOpen, onOpen, onClose} = useDisclosure()
    const[prescriptionSelected,setPrescriptionSelected] = useState(true)
    const[prescriptions,setPrescriptions] = useState<Prescription[]>([]);
    const context = useContext(UserContext);

    useEffect( ()=>{
        const getPrescriptions = async () => {
            //const response = await contrat.methods.showPrescriptionPatient(context.user.uid).call({from: context.selectedAddress});
            //setPrescriptions(response);
            const doctor = new Doctor('doctor',"accessToken","refreshToken","doctor@doctor.com","1234","généraliste","0x24687346");
            const patient = new Patient('patient',"accessToken","refreshToken","patient@patient.com","4321","0x6873468");
            const prescriptions: Prescription[] = [];
            for (var i = 0 ; i  < 10 ; i++){
                prescriptions.push(new Prescription(i,patient,doctor,"covid-"+i,"medic1;medic2,medic3",i+"/J",randomDate(new Date(2012, 0, 1), new Date()),randomDate(new Date(2012, 0, 1), new Date()),!!Math.floor(Math.random() * 2),!!Math.floor(Math.random() * 2)))

            }
            setPrescriptions(prescriptions)
        }

        getPrescriptions()
    },[])
    return (
        <>
            <Header/>
            <Heading mb={"2rem"} textAlign={"center"} color="gray.500">Welcome to your Prescurity patient area </Heading>
            <Flex>
                <Grid mx={"auto"} bg="gray.100" p={"2rem"} w={"20rem"} alignSelf={"flex-start"}>
                    <Avatar  size='xl'  src="https://bit.ly/broken-link" m={"auto"}/>
                    <Text  fontSize={"lg"} textAlign="center" mb={"2rem"}>Welcome {} </Text>
                    <Button mb={"2rem"} border={"1px grey solid"}  isActive={prescriptionSelected} onClick={()=>{setPrescriptionSelected(true)}}>
                        <Text m={'auto'} >Prescriptions</Text> <ChevronRightIcon />
                    </Button>
                    <Button mb={"2rem"} border={"1px grey solid"}   isActive={!prescriptionSelected} onClick={()=>{setPrescriptionSelected(false)}}>
                        <Text m={'auto'} >QR code</Text> <ChevronRightIcon />
                    </Button>
                </Grid>
                <Container h={"100%"}>
                    <Heading  fontSize={"xl"} alignText="center" mb={"2rem"}> Prescriptions</Heading>
                    <Grid>
                        {
                            prescriptions.map((prescription : Prescription)=>{
                                return <CardPrescription prescription={prescription}/>
                            })
                        }
                    </Grid>
                </ Container>
            </Flex>
        </>
    )
}

export default Index;