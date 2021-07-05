import { Container, Text, Flex, Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";




const Index = () => {

    return (
        <>
            <Container height="100vh" bg="none">

<Flex direction={{base:"column", md:"row"}}  justifyContent={{md:"space-between"}} margin="1rem" padding="1rem">


    <Flex direction="column" alignItems="flex-start"  margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>

        <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem">Informations</Heading>

        <Container alignItems="left" bg="none" margin="2rem" >

            <Text fontSize={{base:"sm", md:"md"}} color="gray.700"> Patient address </Text>
            <Input 
                size="md" 
                borderRadius="6px" 
                borderColor="gray.200"  
                width="20rem" 
                
            />
            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 

        </Container>

        <Container alignItems="left" bg="none" margin="2rem" >

            <Text fontSize={{base:"sm", md:"md"}} color="gray.700" > Pharmacist address</Text>
            <Input 
                size="md" 
                borderRadius="6px" 
                borderColor="gray.200"  
                width="20rem"
                
            />
            <Text fontSize={{base:"xs", md:"sm"}} as="u"  color="gray.500">OR scan the QR code</Text> 

        </Container>


    </Flex>


    <Flex direction="column" alignItems="flex-start" margin={{md:"1rem"}} padding={{md:"1rem"}} marginLeft={{base:"2rem"}}>
        <Heading fontSize={{base:"lg", md:"xl"}} marginLeft="1rem" marginBottom="1rem" >Medicine</Heading>

     

    </Flex>  
    <Button 
        marginTop="1rem" 
        alignSelf={{base:"center", md:"left"}} 
        fontSize={{base:"xs", md:"sm"} 
        onClick={handleAddMedicine}}>
            Add new medicine
            </Button>

</Flex>

<Button colorScheme="blackAlpha" margin="2rem" onClick={handlePrescription}>Transfer</Button>

</Container>
        </>
        
    )

}

