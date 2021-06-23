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
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons";

const WelcomePatient = () => {
    const mobileNav = useDisclosure();
    const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

    return(
    <>
           
       <Text font-size="20em" color="gray.500">Welcome to your Prescurity patient area </Text> 
       
       <Box gb="black" w="100%" p={4} color = "black"> 
       </Box>
       
       <Flex color="black">
       
            <Center w="19em" h='500' bg="gray.100">
       
                <Box gb="black" w="100%" p={4} color = "black">
       
                    <Center  h="0,5em" >
                    <Avatar  size='xl' alignItems="center" src="https://bit.ly/broken-link" />
                    </Center>
    
                    <Center  h="14em" >
                    <Text  h= "12em" font-ize="lg"alignText="center">Welcome, </Text>
                    </Center>
        
                    <Center  h="4rem" >
                    <Grid p="0em"  w="18rem" border='0,06rem' ></Grid>
                    </Center>

                    <Grid p="absolute"  w="21rem" h="2,375rem" border='0,06rem' borderRadius ="0,25rem" placeholder="Prescriptions" ></Grid>
                    <Select placeholder="Prescriptions ">  </Select>
                    <Select placeholder="QR Code">        </Select>

                    <Select icon={<ChevronRightIcon />} placeholder="Prescurity" />
                    <Select icon={<ChevronRightIcon />} placeholder="QR Code" />

                </Box>
            </Center>   
        </Flex>   
    </>
    );
}

export default WelcomePatient