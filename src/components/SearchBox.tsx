import { Box, Heading, Input, Text } from "@chakra-ui/react";
import {Container} from './Container'

export const SearchBox = () => {
    
    return (
        <Container alignItems="left" bg="none" margin="2rem" >
            <Text size="md" color="gray.700" >Patient adress</Text>
            <Input size="md" borderRadius="6px" borderColor="gray.200"  width="20rem"/>
            <Text size="sm" as="u"  color="gray.500">OR scan the QR code</Text> 
        </Container>
    )
}