

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
            <Flex direction={{base:"column", md:"row"}}  justifyContent={{md:"space-between"}} margin="1rem" padding="1rem">
                <Flex direction="column" alignContent="flex-start"  margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
                    <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem">Informations</Heading>
                    <SearchBox type="Patient"/>
                    <SearchBox type="Pharmacist"/>
                </Flex>
                <Flex direction="column" alignItems="flex-start" margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
                    <Heading marginLeft="1rem" marginBottom="1rem" fontSize={{base:"lg", md:"xl"}}>Medicine</Heading>
                    <Table>
                        
                        <Medicine name="Doliprane" frequency="2x par j" />
                        <Medicine name="Doliprane et euphon" frequency="2x par j" />
                               
                           
                    </Table>
                    <Button marginTop="1rem" alignSelf={{base:"center", md:"left"}} fontSize={{base:"xs", md:"sm"}}>Add new medicine</Button>
                </Flex>
            
            </Flex>
            <Button colorScheme="blackAlpha" margin="2rem">Transfer</Button>
        
        </Container>

    )
}