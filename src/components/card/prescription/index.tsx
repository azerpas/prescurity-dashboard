import React from "react";
import { Prescription } from "../../../entity/Prescription";
import { Box } from "@chakra-ui/layout";
import { SimpleGrid, Heading, Text, propNames } from "@chakra-ui/react";


const Index = ({prescription}: {prescription: Prescription}) => {
    return(
        <Box border="1px solid rgba(0, 0, 0, 0.08)" p={3}>
            <SimpleGrid columns={{base: 1, md: 3}}>
                <Box>
                    <Heading fontSize="sm">Date</Heading>
                    <Text fontSize="sm">{new Date(parseInt(prescription.start_timestamp)).toDateString()}</Text>
                </Box>
                <Box>
                    <Heading fontSize="sm">Docteur’s name</Heading>
                    <Text fontSize="sm">{prescription.doctor.name}</Text>
                </Box>
                <Box>
                    <Heading fontSize="sm">Pharmacy name</Heading>
                    <Text fontSize="sm">{prescription.pharmacy.name}</Text>
                </Box>
            </SimpleGrid>
        </Box>
    );
}

export default Index;