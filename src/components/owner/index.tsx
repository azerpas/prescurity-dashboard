import { Container, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";
import Header from "../header";

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {
    const [docAddress, setDocAddress] = useState<string|undefined>();
    const [patientAddress, setPatientAddress] = useState<string|undefined>();
    const [pharmacyAddress, setPharmacyAddress] = useState<string|undefined>();
    const setDocPatient = async () => {
        const selectedAddr = await getSelectedAddress();
        const response2 = await contrat.methods.addDoctor(docAddress,"Henry","Chirurgien").send({from: selectedAddr});
        console.log(response2);
        const response3 = await contrat.methods.addPatient(281129375779184,patientAddress).send({from: selectedAddr});
        console.log(response3);
        const response4 = await contrat.methods.addPharmacy(pharmacyAddress, "Pharmacie de la gare").send({from: selectedAddr});
        console.log(response4);
    }
    const canSubmit = () => !docAddress || !patientAddress || !pharmacyAddress;
    return (
        <Container height="100vh" bg="none" alignItems="left">
            <Header/>
            <Input value={docAddress} onChange={(event) => setDocAddress(event.target.value)} placeholder="Doctor address"/>
            <Input value={patientAddress} onChange={(event) => setPatientAddress(event.target.value)} placeholder="Patient address"/>
            <Input value={pharmacyAddress} onChange={(event) => setPharmacyAddress(event.target.value)} placeholder="Pharmacy address"/>
            <Button onClick={setDocPatient} disabled={canSubmit()}>Set doc & patient</Button>
            {canSubmit() ? <Text>Fill all the inputs before clicking</Text> : <></>}
        </Container>
    );
}

export default Index;