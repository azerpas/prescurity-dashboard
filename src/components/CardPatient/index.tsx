import {
    chakra,
    Button,
    Flex,
    Box,
    HStack,
    Icon,
    IconButton,
    Text,
    Heading,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useUpdateEffect,
    HTMLChakraProps,
    Grid,
    Link,
    SimpleGrid,
    Center,
    Square,
        
} from "@chakra-ui/react"
import { FaMoon, FaSun, FaYoutube } from "react-icons/fa";
import NextLink from "next/link"
import React, { HTMLProps } from "react"
import { useViewportScroll } from "framer-motion";
import styled from '@emotion/styled';
import Logo from "../logo";
import { Select } from "@chakra-ui/react"

const WelcomePatient = () => {
    const mobileNav = useDisclosure();
    const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

    return(
        <>
            <Text font-size="20px" color="gray.500">Welcome to your Prescurity patient area </Text> 
        
            <Box gb="black" w="100%" p={5} color = "black"> </Box>
        
            <Flex color="black">
            
                <Center w="300px" h='500' bg="gray.100" >
                
                <Box gb="black" w="100%" p={4} color = "black">
                
                <Text font-size="lg"> Welcome, </Text>
                
                <Select placeholder="Prescriptions" >  </Select>
                <Select placeholder="QR Code">        </Select>

                </Box>
                </Center>   
            </Flex>   
        </>
    );
}

export default WelcomePatient