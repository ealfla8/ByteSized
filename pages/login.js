import { useState } from "react";
import { useRouter } from "next/router";
import { NextLink } from "next/link";
import {
  FormControl,
  Input,
  Flex,
  Button,
  Heading,
  VStack,
  Text,
  HStack,
  FormLabel,
  Link,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Login() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    const formData = new FormData(e.target);

    supabase.auth
      .signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((user, error) => {
        setIsSubmitLoading(false);

        // If login successful
        if (user) {
          const urlParams = new URLSearchParams(window.location.search);
          // successful login
          if (urlParams.get("redirectedFrom")) {
            router.push(urlParams.get("redirectedFrom"));
          } else if (user.error) {
            setErrorMessage(user.error.message);
          } else {
            router.push("/home");
          }
        } else if (error) {
          setErrorMessage(error.message);
        }
      });
  };

  return (
    <Flex
      backgroundColor="gray.700"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      height="100vh"
    >
      <Flex
        direction="column"
        backgroundColor="gray.50"
        padding={7}
        rounded={50}
        position="relative"
        width="50%"
        textColor="gray.700"
      >
        <VStack spacing={5} marginTop={5} marginBottom={5}>
          <Heading size="xl">A Second Chance</Heading>
          <Heading size="md">User Login</Heading>
          <FormControl
            as="form"
            onSubmit={onSubmit}
            width="70%"
            variant="outline"
          >
            <VStack spacing={5}>
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
                  type="password"
                  id="input-password"
                  name="password"
                  required
                />
                <FormLabel>Password</FormLabel>
              </FormControl>
              <Button
                colorScheme="gray"
                type="submit"
                size="md"
                width="43%"
                isLoading={isSubmitLoading}
              >
                Login
              </Button>
            </VStack>
          </FormControl>
          <Button
              colorScheme="gray"
              type="submit"
              size="sm"
              width="30%"
              onClick={() => {
                window.location.assign("/");
              }}
          >
            Back to Home
          </Button>
          <Text fontSize="xs" color="red.500">{errorMessage}</Text>
          <HStack>
            <Text color="gray.400" fontWeight="bold" fontSize="xs">Forgot Password:</Text>
            <Link fontSize="xs" as={NextLink} href='/verify-email-customer'>Customer</Link>
            <Text color="gray.400" fontWeight="semi-bold">|</Text>
            <Link fontSize="xs" as={NextLink} href='/verify-email-restaurant'>Restaurant</Link>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
