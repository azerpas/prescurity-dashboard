import React from "react";
import {useState} from "react";
import {Container, Button, Input, Text, useDisclosure, Avatar, Box, Center, Select, Grid} from "@chakra-ui/react";
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {getSelectedAddress} from "../../utils/web3";
import Header from "../header";
import {ChevronRightIcon} from "@chakra-ui/icons";
import {Flex, Heading} from "@chakra-ui/layout";

const Index = ({web, contrat}: { web: Web3, contrat: Contract }) => {
    // TODO: Fonctions pour communiquer avec la blockchain
    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=114%3A3
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Header/>
            <ul>
                {/** TODO: Éléments graphiques à ajouter */}
                <li>Consulter les X dernières prescriptions et les payer</li>
            </ul>
            <Heading mb={2} textAlign={"center"} color="gray.500">Welcome to your Prescurity patient area </Heading>
            <Flex>
                <Grid m={"auto"} bg="gray.100" p={"2rem"} w={"20rem"} textAlign={"center"}>
                    <Avatar  size='xl'  src="https://bit.ly/broken-link" m={"auto"}/>
                    <Text h="12em" font-ize="lg" alignText="center">Welcome {} </Text>
                    <Select icon={<ChevronRightIcon/>} placeholder="Prescriptions" textAlign={['center']} bottom="130">
                        {}
                    </Select>
                </Grid>
            </Flex>
        </>
    )
}

export default Index;