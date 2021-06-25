import { Box, Heading, Input, Text } from "@chakra-ui/react";
import {Container} from './Container'

export const SearchBox = (props: {type: String}) => {

    
    
    return (
        <Container alignItems="left" bg="none" margin="2rem" >
            <Text fontSize={{base:"sm", md:"md"}} color="gray.700" >{props.type} address</Text>
            <Input size="md" borderRadius="6px" borderColor="gray.200"  width="20rem"/>
            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 
        </Container>
    )
}