import {useRouter} from "next/router";
import {
    FormControl,
    Input,
    Flex,
    Button,
    Heading,
    VStack,
    Text,
    HStack
} from "@chakra-ui/react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function Login() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        supabase.auth
            .signInWithPassword({
                email: formData.get("email"), password: formData.get("password"),
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
        <Flex alignItems="center" justifyContent="center" minH="100vh" height="100vh">
            <Flex
                direction="column"
                background="gray.700"
                padding={7}
                rounded={50}
                position="relative"
                width="50%"
            >
                <VStack spacing={5} marginTop={5}>
                    <Heading color="white" size="2xl">A Second Chance</Heading>
                    <Heading color="white" size="md">User Login</Heading>
                    <FormControl as="form" onSubmit={onSubmit}>
                        <VStack spacing={5} margin={3}>
                            <Input
                                placeholder="Email"
                                type="email"
                                id="input-email"
                                name="email"
                                width="70%"
                                bgColor="white"
                                variant="outline"
                                marginTop={5}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                id="input-password"
                                name="password"
                                width="70%"
                                bgColor="white"
                                variant="outline"
                            />
                            <Button colorScheme="gray" fontWeight="bold" variant="solid" textColor="gray.700"
                                    type="submit" size="md"
                                    width="30%">Login</Button>
                            <HStack>
                                <Button colorScheme="gray" fontSize="sm" variant="link">Forgot Password</Button>
                                <Text fontWeight="semibold" color="white">|</Text>
                                <Button colorScheme="gray" fontSize="sm" variant="link">Register</Button>
                            </HStack>
                        </VStack>
                    </FormControl>
                </VStack>
            </Flex>
        </Flex>
    );
}