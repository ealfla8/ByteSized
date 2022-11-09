import {
  FormControl,
  Input,
  Flex,
  Button,
  Text,
  VStack,
  Heading,
  Select,
  extendTheme,
  ChakraProvider,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { error } from "next/dist/build/output/log";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              bgColor: "gray.50",
              textColor: "gray.700",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");

  const supabase = useSupabaseClient();
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    }).then((response) => {
      if (response.ok) {
        supabase.auth
          .signInWithPassword({
            email: formData.get("email"),
            password: formData.get("password"),
          })
          .then((user, error) => {
            if (user) {
              router.push("/home");
            } else {
              console.log(error);
            }
          });
      } else {
        response.json().then((data) => setErrorMessage(data.error.message));
      }
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        bgColor="gray.700"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        h="100%"
      >
        <Flex
          direction="column"
          bgColor="gray.50"
          padding={7}
          rounded={50}
          position="relative"
          width="50%"
          textColor="gray.700"
        >
          <VStack spacing={5} mt={5} mb={5}>
            <Heading size="xl">A Second Chance</Heading>
            <Heading size="md">User Registration</Heading>
            <FormControl
              as="form"
              onSubmit={onSubmit}
              width="70%"
              variant="outline"
            >
              <VStack spacing={7}>
                <FormControl variant="floating">
                  <Select placeholder="Select one" required>
                    <option value="customer">Customer</option>
                    <option value="restaurant">Restaurant</option>
                  </Select>
                  <FormLabel>Register as</FormLabel>
                </FormControl>
                <FormControl variant="floating">
                  <Input
                    placeholder=" "
                    type="name"
                    id="input-name"
                    name="name"
                    required
                  />
                  <FormLabel>Name</FormLabel>
                </FormControl>
                <FormControl variant="floating">
                  <Input
                    placeholder=" "
                    type="email"
                    id="input-email"
                    name="email"
                    required
                  />
                  <FormLabel>Email</FormLabel>
                </FormControl>
                <FormControl variant="floating">
                  <Input
                    placeholder=" "
                    type="username"
                    id="input-username"
                    name="username"
                    required
                  />
                  <FormLabel>Username</FormLabel>
                </FormControl>
                <FormControl variant="floating">
                  <Input
                    placeholder=" "
                    type="password"
                    id="input-password"
                    name="password"
                    required
                  />
                  <FormLabel>Password</FormLabel>
                </FormControl>
                <Button type="submit">Create Account</Button>
              </VStack>
            </FormControl>
          </VStack>
          <Text>{errorMessage}</Text>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
