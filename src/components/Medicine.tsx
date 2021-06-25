import { Tr, Td, Tbody, Table} from "@chakra-ui/table"
import { Text, Flex } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"

export const Medicine = (props: {name: String, frequency: String}) => {

    return (
        <Tbody>
            <Flex alignContent={{base:"center" , md:"left"}}  alignItems="center"  size={{base:"sm", md:"md"}} border="1px" borderColor="gray.600" borderRadius="6px" margin="0.5rem" >
            
                <Td padding="0.5rem">
                    <Tr ><Text >MedicineName</Text></Tr>
                    <Tr ><Text >{props.name}</Text></Tr>
                
                </Td>
                <Td padding="0.5rem">
                    <Tr><Text>frequency</Text></Tr>
                    <Tr><Text >{props.frequency}</Text></Tr>
                </Td>
        
                <IconButton aria-label="delete"/>
            </Flex>  
        </Tbody>
        
        
       
    )
}