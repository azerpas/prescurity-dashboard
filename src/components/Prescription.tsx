import { Tr, Td, Tbody} from "@chakra-ui/table"

import { Text, Flex, Box } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"

export const Prescription = () => {
    return (
        <Tbody > 
            <Flex alignItems="center" border="1px" borderColor="gray.700" borderRadius="4px" marginBottom="3px" padding="0.5rem" >
                
                    <Td>
                        <Tr ><Text >Date</Text></Tr>
                        <Tr ><Text >XX/XX/XXXX</Text></Tr>
                        
                    </Td>
                    <Td>
                        <Tr><Text>Doctor</Text></Tr>
                        <Tr><Text >XXX</Text></Tr>
                    </Td>
                    <Td>
                        <Tr ><Text >Pharmacist</Text></Tr>
                        <Tr ><Text >XXX</Text></Tr>
                        
                    </Td>
                
                    <IconButton aria-label="go to file" />
            </Flex>


            
           
        </Tbody>
       
    )
}