// option pour ajouter plusieurs médicaments à supprimer 


import { Box, Text } from "@chakra-ui/layout";
import React from 'react';
import { CloseButton } from "@chakra-ui/react";
import { useState } from "react" ;


const Medicine = () => {

    const [medicine, setMedicine] = useState("");
    const [frequency, setfrequency] = useState("");


    const handleDelete = () => {
        
        // suppression du médicament
        setMedicine("")
        setfrequency("")

    }

    return (
        <>
                    <Box padding="0.5rem" >
                    
                        <ul ><Text fontWeight="bold" >MedicineName</Text></ul>
                        <ul ><Text >doliprane </Text></ul>
                    
                    </Box>
                    
                    <Box padding="0.5rem" >
                
                        <ul><Text fontWeight="bold">frequency</Text></ul>
                        <ul><Text >2x par jour</Text></ul>
            
                    </Box >
        
                    <CloseButton onClick={handleDelete}/>
        </>

    )
} 

export default Medicine
