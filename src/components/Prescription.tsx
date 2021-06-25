import { Tr, Td, Tbody} from "@chakra-ui/table"
import { Text, Flex, Box } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"

export const Prescription = (props: {date: String, doctor: String, pharmacist: String}) => {
    return (
        <Tbody>
            <Flex alignContent={{base:"center" , md:"left"}} alignItems="center" size={{base:"sm", md:"md"}} border="1px" borderColor="gray.700" borderRadius="4px" margin="0.5rem">
                
                <Td shrink="1">
                    <Tr><Text>Date</Text></Tr>
                    <Tr><Text>{props.date}</Text></Tr>
                    
                </Td>
                <Td shrink="1">
                    <Tr><Text>Doctor</Text></Tr>
                    <Tr><Text>{props.doctor}</Text></Tr>
                </Td>
                <Td shrink="1">
                    <Tr><Text>Pharmacist</Text></Tr>
                    <Tr><Text >{props.pharmacist}</Text></Tr>
                    
                </Td>
            
                <IconButton aria-label="go to file" shrink="2"/>
            </Flex>  
        </Tbody>
            
       
    )
}