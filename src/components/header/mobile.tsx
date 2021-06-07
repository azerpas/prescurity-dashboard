import { IconButton, CloseButton, useColorModeValue, IconButtonProps, useBreakpointValue, useUpdateEffect, Flex, Box, BoxProps, Button, HStack, Center } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import NextLink from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useElementScroll } from "framer-motion";

function NavLink({ href, children }) {
    const { pathname } = useRouter()
  
    const [, group] = href.split("/")
    const isActive = pathname.includes(group)
  
    return (
      <NextLink href={href}>
        <Center
          flex="1"
          minH="40px"
          as="button"
          rounded="md"
          transition="0.2s all"
          fontWeight={isActive ? "semibold" : "medium"}
          bg={isActive ? "teal.400" : undefined}
          borderWidth={isActive ? undefined : "1px"}
          color={isActive ? "white" : undefined}
          _hover={{
            bg: isActive
              ? "teal.500"
              : useColorModeValue("gray.100", "whiteAlpha.100"),
          }}
        >
          {children}
        </Center>
      </NextLink>
    )
}

export const MobileNavButton = React.forwardRef(
    (props: IconButtonProps, ref: React.Ref<any>) => {
        return (
            <IconButton
                ref={ref}
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                {...props}
            />
        )
    },
);

interface MobileNavContentProps {
    isOpen?: boolean
    onClose?: () => void
}

export const MobileNavContent = (props: MobileNavContentProps) => {
    const { isOpen, onClose } = props;
    const closeBtnRef = React.useRef<HTMLButtonElement>();
    const { pathname } = useRouter();

    const showOnBreakpoint = useBreakpointValue({ base: true, lg: false });
  
    React.useEffect(() => {
      if (showOnBreakpoint == false) {
        onClose()
      }
    }, [showOnBreakpoint]);

    useUpdateEffect(() => {
        if (isOpen) {
          requestAnimationFrame(() => {
            closeBtnRef.current?.focus()
          })
        }
    }, [isOpen]);

    const [shadow, setShadow] = React.useState<string>();

    return (
        <>
            {isOpen &&
            (
                <Flex
                direction="column"
                w="100%"
                bg={useColorModeValue("white", "gray.800")}
                h="100vh"
                overflow="auto"
                pos="absolute"
                top="0"
                left="0"
                zIndex={20}
                pb="8"
            >
                <Box>
                    <Flex justify="space-between" px="6" pt="5" pb="4">
                        <HStack spacing="5">
                            <Button ml="5" shadow="lg">Login</Button>
                            <CloseButton ref={closeBtnRef} onClick={onClose} />
                        </HStack>
                    </Flex>
                    <Box px="6" pb="6" pt="2" shadow={shadow}>
                        <HStack>
                            <NavLink href="/docs/getting-started">Docs</NavLink>
                            <NavLink href="/guides/integrations/with-cra">
                                Guides
                            </NavLink>
                            <NavLink href="/team">Team</NavLink>
                        </HStack>
                    </Box>
                </Box>

                <ScrollView
                    onScroll={(scrolled) => {
                        setShadow(scrolled ? "md" : undefined)
                    }}
                >
                </ScrollView>
            </Flex>
            )}
        </>
    );
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
    const { onScroll, ...rest } = props
    const [y, setY] = React.useState(0)
    const elRef = React.useRef<any>()
    const { scrollY } = useElementScroll(elRef)
    React.useEffect(() => {
      return scrollY.onChange(() => setY(scrollY.get()))
    }, [scrollY])
  
    useUpdateEffect(() => {
      onScroll?.(y > 5 ? true : false)
    }, [y])
  
    return (
      <Box
        ref={elRef}
        flex="1"
        id="routes"
        overflow="auto"
        px="6"
        pb="6"
        {...rest}
      />
    )
}