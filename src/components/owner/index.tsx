import { Container, Button, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Header from "../header";

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {
    const [consultationId, setConsultationId] = useState();
    const [docAddress, setDocAddress] = useState<string|undefined>();
    const [patientAddress, setPatientAddress] = useState<string|undefined>();
    const [pharmacyAddress, setPharmacyAddress] = useState<string|undefined>();
    const setDocPatient = async () => {
        const accounts = await web.eth.getAccounts();
        const response2 = await contrat.methods.addDoctor(docAddress,"Henry","Chirurgien").send({from: accounts[0]});
        console.log(response2);
        const response3 = await contrat.methods.addPatient(281129375779184,patientAddress).send({from: accounts[0]});
        console.log(response3);
        const response4 = await contrat.methods.addPharmacy(281129375779184,pharmacyAddress).send({from: accounts[0]});
        console.log(response4);
    }
    const canSubmit = () => !docAddress || !patientAddress || !pharmacyAddress;
    return (
        <Container height="100vh" bg="none" alignItems="left">
            <Header/>
            <Input value={docAddress} onChange={(event) => setDocAddress(event.target.value)}/>
            <Input value={patientAddress} onChange={(event) => setPatientAddress(event.target.value)}/>
            <Input value={pharmacyAddress} onChange={(event) => setPharmacyAddress(event.target.value)}/>
            <Button onClick={setDocPatient} disabled={canSubmit()}>Set doc & patient</Button>
            {}
        </Container>
    );
}

export default Index;