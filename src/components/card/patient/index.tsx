import React, {useContext} from "react";
import {Box} from "@chakra-ui/layout";
import {Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {Contract} from "web3-eth-contract";
import {UserContext} from "../../../context/user";
import {Patient} from "../../../entity/Patient";

const Index = ({patient , contrat}: { patient: Patient , contrat:Contract }) => {
    const userData = useContext(UserContext);

    return (
        <Box border="1px solid rgba(0, 0, 0, 0.08)" p={3} mt={"1rem"}>
            <SimpleGrid columns={{base: 1, sm: 4}} spacingX={"5"}>
                <Box>
                    <Heading fontSize="sm" mb={"0.7rem"}>Name</Heading>
                    <Text fontSize="sm">{patient.name}</Text>
                </Box>
                <Box>
                    <Heading fontSize="sm" mb={"0.7rem"}>Security Number</Heading>
                    <Text fontSize="sm">{patient.uid}</Text>
                </Box>
            </SimpleGrid>
        </Box>
    );
}

export default Index;