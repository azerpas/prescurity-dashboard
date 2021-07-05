import {Button, chakra, Flex, Heading, HStack, HTMLChakraProps, IconButton, useColorMode, useColorModeValue, useDisclosure, useUpdateEffect,} from "@chakra-ui/react"
import {FaMoon, FaSun} from "react-icons/fa";
import Link from "next/link"
import React, {useContext} from "react"
import {MobileNavButton, MobileNavContent} from "./mobile";
import {useViewportScroll} from "framer-motion";
import styled from '@emotion/styled';
import Logo from "../logo";
import {UserContext} from "../../context/user";

const HeaderContent = () => {
    const mobileNav = useDisclosure();
    const text = useColorModeValue("dark", "light");
    const button = useColorModeValue("black", "light");
    const {toggleColorMode: toggleMode} = useColorMode();
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
    const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

    useUpdateEffect(() => {
        mobileNavBtnRef.current?.focus();
    }, [mobileNav.isOpen]);

    const userLoggedIn = useContext(UserContext).loggedIn;
    return (
        <>
            <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
                <Flex align="center" py="3">
                    <Link href={"/"}>
                        <a>
                            <Flex align={"center"}>
                                <Logo/>
                                <Heading size="xl" fontWeight="bold" ml="2">Prescurity</Heading>
                            </Flex>
                        </a>
                    </Link>
                </Flex>

                <Flex
                    justify="flex-end"
                    w="100%"
                    align="center"
                    color="gray.400"
                    maxW="1100px"
                >
                    <HStack display={{base: "none", md: "flex"}}><IconButton
                        size="md"
                        fontSize="lg"
                        aria-label={`Switch to ${text} mode`}
                        variant="ghost"
                        color="current"
                        ml={{base: "0", md: "3"}}
                        onClick={toggleMode}
                        icon={<SwitchIcon/>}
                    />
                        {
                            userLoggedIn ?
                                <Link href="/signOut"><a><Button ml="5" shadow="lg" bg={button} color="white" variant="solid">Sign Out</Button></a></Link>
                            :
                                <>
                                <Link href="/login"><a><Button ml="5" shadow="lg" bg={button} color="white" variant="solid">Dashboard</Button></a></Link>
                                </>
                        }

                    </HStack>
                    <MobileNavButton
                        ref={mobileNavBtnRef}
                        aria-label="Open Menu"
                        onClick={mobileNav.onOpen}
                    />
                </Flex>
            </Flex>
            <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose}/>
        </>
    );
}

const Div = styled.div`
  height: "4.rem";
  margin: "0 auto";
  max-width: "6rem";
`;

const Header = (props: HTMLChakraProps<"header">) => {
    const bg = useColorModeValue("white", "gray.800")
    const ref = React.useRef<HTMLHeadingElement>()
    const [y, setY] = React.useState(0)
    const {height = 0} = ref.current?.getBoundingClientRect() ?? {}

    const {scrollY} = useViewportScroll()
    React.useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()))
    }, [scrollY])

    return (
        <chakra.header
            ref={ref}
            shadow={y > height ? "sm" : undefined}
            transition="box-shadow 0.2s, background-color 0.2s"
            pos="sticky"
            top="0"
            zIndex="3"
            bg={bg}
            left="0"
            right="0"
            width="full"
            {...props}
        >
            <Div>
                <HeaderContent/>
            </Div>
        </chakra.header>
    );
}

export default Header