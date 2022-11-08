import {useRouter} from "next/router";
import {
    FormControl,
    FormLabel,
    Input,
    Container,
    Flex,
    Button,
    Heading,
    Center,
    VStack,
    InputGroup
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
        <Flex alignItems={"center"} justifyContent={"center"} minH={"100vh"} height={"100vh"}>
            <Flex
                direction={"column"}
                background={"gray.700"}
                padding={10}
                rounded={50}
                position={"relative"}
                width={"50%"}
            >
                <VStack spacing={2} marginTop={5}>
                    <Heading color="white" size="2xl">A Second Chance</Heading>
                    <Heading color={"white"} size="md">User Login</Heading>
                    <FormControl as="form" onSubmit={onSubmit}>
                        <VStack spacing={5} margin={3}>
                            <Input
                                placeholder="email"
                                type="email"
                                id="input-email"
                                name="email"
                                width={"80%"}
                                bgColor={"white"}
                                variant={"outline"}
                                marginTop={7}
                            />
                            <Input
                                placeholder="password"
                                type="password"
                                id="input-password"
                                name="password"
                                width={"80%"}
                                bgColor={"white"}
                                variant={"outline"}
                            />
                            <Button colorScheme={"gray"} variant={"solid"} type="submit">Login</Button>
                        </VStack>
                    </FormControl>
                </VStack>
            </Flex>
        </Flex>
    );
}
