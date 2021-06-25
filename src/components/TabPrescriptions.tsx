import { Tbody} from "@chakra-ui/table";
import { Prescription } from "./Prescription";
import { Text, Flex } from "@chakra-ui/layout";
import { Table } from "@chakra-ui/table";

import React from 'react';


export const TabPrescriptions = () => {
    return (
        
        <Flex direction="column" alignItems="left" justifyContent="flex-start" margin="1rem" padding="1rem">
            <Text padding="1rem" size="md" color="gray.700">Patient adress: xxxx@xxxx.com</Text>
            <Table size="md" > 
                <Tbody>
                    <Prescription date="XX/XX/XXXX" doctor="XXX" pharmacist="XXX"/>
                </Tbody>
            </Table>
        </Flex>
        
       
       
    )
}