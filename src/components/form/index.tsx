import {
  chakra,
  Flex,
  Grid,
  useDisclosure,
  useUpdateEffect,
  HTMLChakraProps,
  FormControl,
  Input,
  FormLabel

} from "@chakra-ui/react"
import React from "react"
import { useViewportScroll } from "framer-motion";

const FormContent = () => {
  const mobileNav = useDisclosure();
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
      mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

    return(
        <Grid border='1px' flex-direction='column'>
            <Flex  >
            <FormControl id="email">
                <FormLabel>Email adress 👤</FormLabel>
                <Input type="email" />
                </FormControl>
            </Flex>
            <Flex >
            <FormControl id="password">
                <FormLabel>Password 🔑</FormLabel>
                <Input type="password" />
                </FormControl>
            </Flex>
        </Grid>
    );
    }

const Form = (props: HTMLChakraProps<"form">) => {
  const ref = React.useRef<HTMLFormElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useViewportScroll()
  React.useEffect(() => {
      return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
      <chakra.form
          ref={ref}
          shadow={y > height ? "sm" : undefined}
          transition="box-shadow 0.2s, background-color 0.2s"
          pos="relative"
          width="full"
          {...props}
      >
        <FormContent />
      </chakra.form>  
  );
}

export default Form