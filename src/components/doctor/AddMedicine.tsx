import { Box, Text, Flex} from "@chakra-ui/layout" ;
import { CloseButton } from "@chakra-ui/close-button";
import { useState } from "react" ;

const Index = () => {

    const [medicine, setMedname] = useState<string|undefined>();
    const [frequency, setFrequency] = useState<string|undefined>();

    const handleAdd = () =>{
        
    }



    return (

        <Flex alignContent={{base:"center" , md:"left"}}    size={{base:"sm", md:"md"}} border="1px" borderColor="gray.600" borderRadius="6px" margin="0.5rem" marginLeft="2rem">
                    
    <Box padding="0.5rem" >

        <ul ><Text fontWeight="bold" >MedicineName</Text></ul>
        <ul ><Text >doliprane </Text></ul>

    </Box>

    <Box padding="0.5rem" >

    <ul><Text fontWeight="bold">frequency</Text></ul>
    <ul><Text >2x par jour</Text></ul>

    </Box >

    <CloseButton/>

    </Flex>
    )

}

export default Index
