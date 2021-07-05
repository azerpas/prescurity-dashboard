import {Button, Container, FormControl, FormLabel, Heading, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast} from "@chakra-ui/react";
import React, {useState} from "react";
import {DeepMap, FieldError, useForm, UseFormRegister} from "react-hook-form";
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {UserType} from "../../types/user";
import {getSelectedAddress} from "../../utils/web3";
import Header from "../header";

interface DoctorProps {
    address: string;
    name: string;
    speciality: string;
    email: string;
}

interface PharmacyProps {
    address: string;
    name: string;
    email: string;
}

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {
    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=428%3A9206
    const [docAddress, setDocAddress] = useState<string|undefined>();
    const [patientAddress, setPatientAddress] = useState<string|undefined>();
    const [pharmacyAddress, setPharmacyAddress] = useState<string|undefined>();
    const [typeToAdd, setTypeToAdd] = useState<UserType|undefined>();
    const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm<DoctorProps|PharmacyProps>();
    const toast = useToast();

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
    const onSubmit = async (data) => await addUser(data);
    const addUser = async (props: DoctorProps | PharmacyProps) => {
        const selectedAddr = await getSelectedAddress();
        if(typeToAdd === UserType.doctor){
            try {
                const res = await fetch("/api/user", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(props)
                });
                if (!res.ok) {
                    throw new Error((await res.clone().json()).message);
                }

                //@ts-ignore
                const response = await contrat.methods.addDoctor(props.address,props.name,props.speciality).send({from: selectedAddr});
                if (!response.ok) {
                    throw new Error(response);
                }

                toast({
                    title: "Doctor created.",
                    description: "We've linked the Ethereum address to a doctor.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            } catch (error) {
                const r = error.message.match(/reason":"(.*)"},"stack/gm);
                toast({
                    title: "Doctor error.",
                    description: r ? r : error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
            
        }else if(typeToAdd === UserType.pharmacy){
            try {
                //@ts-ignore
                const response = await contrat.methods.addPharmacy(props.address,props.name).send({from: selectedAddr});
                const res = await fetch("/api/user", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(props)
                });
                if (!res.ok) {
                    throw new Error(response);
                }
                toast({
                    title: "Pharmacy created.",
                    description: "We've linked the Ethereum address to a Pharmacy.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            } catch (error) {
                const r = error.message.match(/reason":"(.*)"},"stack/gm);
                toast({
                    title: "Pharmacy error.",
                    description: r ? r : error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    }
    return (
        <>
            <Header/>
            <Container height="100vh">
                <Tabs colorScheme="blackAlpha">
                    <TabList>
                        <Tab>New</Tab>
                        <Tab>Old</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Heading>Welcome owner !</Heading>
                            <Container borderColor="blackAlpha.200" borderWidth="1px" p={5} my={5}>
                                <Text>Choose who you want to add</Text>
                                <Select mb={3} placeholder="Select a type of user to add" onChange={event => setTypeToAdd(event.target.value === "doctor" ? UserType.doctor : (event.target.value === "pharmacy" ? UserType.pharmacy : UserType.doctor))}>
                                    <option value={UserType.doctor}>{UserType.doctor}</option>
                                    <option value={UserType.pharmacy}>{UserType.pharmacy}</option>
                                </Select>
                                <form onClick={handleSubmit(onSubmit)}>
                                    <FormFields type={typeToAdd} register={register} errors={errors}/>
                                    <Button isFullWidth={true} mt={3}>Add a {typeToAdd}</Button>
                                </form>
                            </Container>
                        </TabPanel>
                        <TabPanel>
                            <Input value={docAddress} onChange={(event) => setDocAddress(event.target.value)} placeholder="Doctor address"/>
                            <Input value={patientAddress} onChange={(event) => setPatientAddress(event.target.value)} placeholder="Patient address"/>
                            <Input value={pharmacyAddress} onChange={(event) => setPharmacyAddress(event.target.value)} placeholder="Pharmacy address"/>
                            <Button onClick={setDocPatient} disabled={canSubmit()}>Set doc & patient</Button>
                            {canSubmit() ? <Text>Fill all the inputs before clicking</Text> : <></>}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                
                
            </Container>
        </>
    );
}

type FormProps = {
    type: UserType;
    register: UseFormRegister<DoctorProps|PharmacyProps>;
    errors: DeepMap<DoctorProps | PharmacyProps, FieldError>;
} 

const FormFields = (props: FormProps) => {
    if(props.type === UserType.doctor){
        return (
            <>
                <FormControl id="email" isInvalid={props.errors.name ? true : false}>
                    <FormLabel>Email</FormLabel>
                    <Input {...props.register("email", {required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/im })}/>
                </FormControl>
                <FormControl id="name" isInvalid={props.errors.name ? true : false}>
                    <FormLabel>Name</FormLabel>
                    <Input {...props.register("name", {required: true })}/>
                </FormControl>
                <FormControl id="speciality">
                    <FormLabel>Speciality</FormLabel>
                    <Input {...props.register("speciality", {required: true })}/>
                </FormControl>
                <FormControl id="address" isInvalid={props.errors.address ? true : false}>
                    <FormLabel>Ethereum address</FormLabel>
                    <Input {...props.register("address", {required: true })}/>
                </FormControl>
            </>
        );
    }else if (props.type === UserType.pharmacy){
        return (
            <>
                <FormControl id="email" isInvalid={props.errors.name ? true : false}>
                    <FormLabel>Email</FormLabel>
                    <Input {...props.register("email", {required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/im })}/>
                </FormControl>
                <FormControl id="name" isInvalid={props.errors.name ? true : false}>
                    <FormLabel>Name</FormLabel>
                    <Input {...props.register("name", {required: true })}/>
                </FormControl>
                <FormControl id="address" isInvalid={props.errors.address ? true : false}>
                    <FormLabel>Ethereum address</FormLabel>
                    <Input {...props.register("address", {required: true })}/>
                </FormControl>
            </>
        );
    }else{
        return (<></>);
    }
}

export default Index;