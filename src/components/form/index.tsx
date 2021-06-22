import {
  chakra,
  Flex,
  Grid,
  useDisclosure,
  useUpdateEffect,
  HTMLChakraProps,
  FormControl,
  Input,
  FormLabel,
  Spacer,
  Link,
  Box,

} from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form";
import { useViewportScroll } from "framer-motion";

  

    

const Form_exp = (props: HTMLChakraProps<"form">) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  const mobileNav = useDisclosure();
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
      mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);
  const ref = React.useRef<HTMLFormElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useViewportScroll()
  React.useEffect(() => {
      return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <Grid p="0.5em" w="25em" border='1px' flex-direction='column' mt="2em" >
    <form onSubmit={handleSubmit(onSubmit)}>
    <Flex  >
    <FormControl id="email">
        <FormLabel>Email adress 👤</FormLabel>
        <Input {...register("email")}/>
    </FormControl>
    </Flex>
    <br/>
    <Flex >
    <FormControl id="password">
        <Box>
        <FormLabel>Password 🔑 <Link color="blue" float="right">Forgot Password</Link></FormLabel>
        </Box>
        <Input {...register("password")} />
        </FormControl>
        
    </Flex>
    <br/>
    <Flex text-align="center">
        <Input type="submit" color="white" value ="Sign In" bgColor="black"  />
    </Flex>
    </form>
</Grid> 
  );
}

export default Form_exp