import { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Login() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    supabase.auth
      .signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((user, error) => {
        // If login successful
        if (user) {
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get("redirectedFrom")) {
            router.push(urlParams.get("redirectedFrom"));
          } else {
            router.push("/home");
          }
        }
      });
  };

  return (
    <Flex alignItems="center" minH="100vh" h="100%">
      <Container>
        <FormControl as="form" onSubmit={onSubmit}>
          <FormLabel htmlFor="input-email">Email:</FormLabel>
          <Input type="email" id="input-email" name="email" />
          <FormLabel htmlFor="input-password">Password:</FormLabel>
          <Input type="password" id="input-password" name="password" />
          <Button type="submit">Login</Button>
        </FormControl>
      </Container>
    </Flex>
  );
}
