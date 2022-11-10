import {
  FormControl,
  Input,
  Flex,
  Button,
  Text,
  VStack,
  Heading,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");

  const supabase = useSupabaseClient();
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);

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
            setIsSubmitLoading(false);

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
  );
}
