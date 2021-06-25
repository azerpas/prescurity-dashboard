import { Tr, Td, Tbody, Table} from "@chakra-ui/table"
import { Text, Flex } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"

export const Medicine = (props: {name: String, frequency: String}) => {

    return (
        <Flex alignItems="center" border="1px" borderColor="gray.700" borderRadius="4px"  marginBottom="0.5rem"  >
            
                    <Td>
                        <Tr ><Text >Name</Text></Tr>
                        <Tr ><Text >{props.name}</Text></Tr>
                        
                    </Td>
                    <Td>
                        <Tr><Text>Doctor</Text></Tr>
                        <Tr><Text >{props.frequency}</Text></Tr>
                    </Td>
                
                    <IconButton aria-label="delete"/>
           
        </Flex>  
        
       
    )
}