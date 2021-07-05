import React from "react";
import {Box, Flex, Heading, Spinner, Text} from "@chakra-ui/react";


export const InitBlockchainLoading = ({step}: {step: 0|1|2|3|4}) => {
    return (
        <Flex h="100vh" justifyContent="center" flexDirection="column" textAlign="center">
            <Box w="100%">
                <Spinner size="xl" />
            </Box>
            <Heading mt={3}>2/2 Initializing access to the blockchain...</Heading>
            { step === 0 && <Text size="xl">1/4 Fetching Web3</Text>}
            { step === 1 && <Text size="xl">2/4 Fetching the smart-contract</Text>}
            { step === 2 && <Text size="xl">3/4 Fetching the user address</Text>}
            { step === 3 && <Text size="xl">4/4 Fetching the user type</Text>}
            { step === 4 && <Text size="xl">Ended...</Text>}
        </Flex>
    );
}

export const UserLoading = () => {
    return (
        <Flex h="100vh" justifyContent="center" flexDirection="column" textAlign="center">
            <Box w="100%">
                <Spinner size="xl" />
            </Box>
            <Heading mt={3}>1/2 Getting your account...</Heading>
        </Flex>
    );
}