import { useRouter } from "next/router";
import { useState } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Flex,
  Button,
    Text
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {error} from "next/dist/build/output/log";

export default function Register() {
    const [errorMessage, setErrorMessage] = useState("");

  const supabase = useSupabaseClient();
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/api/signup", {
      method: 'POST',
      body: JSON.stringify({email:formData.get("email"), password: formData.get("password")})
    }).then((response) => {
        if (response.ok) {
            supabase.auth
                .signInWithPassword({
                    email: formData.get("email"),
                    password: formData.get("password"),
                })
                .then((user, error) => {
                    router.push("/home");
                });
        } else {
            response.json().then(data => setErrorMessage(data.error.message));
        }
    })
  };

  return (
    <Flex alignItems="center" minH="100vh" h="100%">
      <Container>
        <FormControl as="form" onSubmit={onSubmit}>
          <FormLabel htmlFor="input-email">Email:</FormLabel>
          <Input type="email" id="input-email" name="email" required />
          <FormLabel htmlFor="input-password">Password:</FormLabel>
          <Input type="password" id="input-password" name="password" required />
          <Button type="submit">Register</Button>
        </FormControl>
        <Text>
            {errorMessage}
        </Text>
      </Container>
    </Flex>
  );
}
