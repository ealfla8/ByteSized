import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Register() {
  const supabase = useSupabaseClient();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    supabase.auth
      .signUp({
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((user, error) => {
        router.push("/home");
        console.log(user, error);
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
          <Button type="submit">Register</Button>
        </FormControl>
      </Container>
    </Flex>
  );
}
