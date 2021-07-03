
// chakra
import { Text } from "@chakra-ui/layout" ;
import { Input }  from "@chakra-ui/input" ;
import Button from "@chakra-ui/button" ;

// react
import { useState } from "react" ;

const AddMedicine = () => {

    const [medicine, setMedname] = useState<string|undefined>();
    const [frequency, setFrequency] = useState<string|undefined>();

    const handleAdd = () => {

        // add medicine to the posting prescription
        
    }



    return (

        <>
            <Text fontSize={{base:"sm", md:"md"}} color="gray.700">Medicine</Text>
            <Input 
                size="md" 
                borderRadius="6px" 
                borderColor="gray.200"  
                width="20rem" 
                
            />
            <Text fontSize={{base:"sm", md:"md"}}  color="gray.700">Frequency</Text> 
            <Input 
                size="md"
                borderRadius="6px"
                borderColor="gray.200"
                width="20rem"
            />
            <Button onClick={handleAdd}>Add</Button>

        
        </>

        

    )

}

export default AddMedicine
