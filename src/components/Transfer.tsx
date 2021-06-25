

import { Flex, Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { SearchBox } from "./SearchBox";
import { Medicine } from "./Medicine";
import { Container } from "./Container";
import { Table, Tbody } from "@chakra-ui/table";

import React from 'react';


export const Transfer = () => {
    return (
        <Container height="100vh" bg="none">
            <Flex direction="row"  justify="space-around" margin="1rem" padding="1rem">
                <Flex direction="column" alignItems="left" justify="flex-start" margin="1rem" padding="1rem">
                    <Heading>Informations</Heading>
                    <SearchBox type="Patient"/>
                    <SearchBox type="Pharmacist"/>
                </Flex>
                <Flex direction="column" alignItems="left" justify="flex-start" margin="1rem" padding="1rem">
                    <Heading marginBottom="1rem" >Medicine</Heading>
                    <Table>
                        <Tbody > 
                    <Medicine name="Doliprane" frequency="2x par j" />
                    <Button marginTop="1rem">Add new medicine</Button>

                    </Tbody>
                </Table>
                </Flex>
            
            </Flex>
            <Button colorScheme="blackAlpha" margin="1rem">Transfer</Button>
        
        </Container>

    )
}