import {useRouter} from "next/router";
import {
    FormControl,
    Input,
    Flex,
    Button,
    Heading,
    VStack,
    Text,
    HStack,
    extendTheme,
    ChakraProvider,
    FormLabel
} from "@chakra-ui/react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
};
export const theme = extendTheme({
    components: {
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles
                            }
                        },
                        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                            ...activeLabelStyles
                        },
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: "absolute",
                            backgroundColor: "gray.50",
                            textColor: "gray.700",
                            pointerEvents: "none",
                            mx: 3,
                            px: 1,
                            my: 2,
                            transformOrigin: "left top"
                        }
                    }
                }
            }
        }
    }
});

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
        <ChakraProvider theme={theme}>
            <Flex backgroundColor="gray.700" alignItems="center" justifyContent="center" minH="100vh" height="100vh">
                <Flex
                    direction="column"
                    background="gray.50"
                    padding={7}
                    rounded={50}
                    position="relative"
                    width="50%"
                    textColor="gray.700"
                >
                    <VStack spacing={5} marginTop={5} marginBottom={5}>
                        <Heading size="2xl">A Second Chance</Heading>
                        <Heading size="md">User Login</Heading>
                        <FormControl as="form" onSubmit={onSubmit} width="70%" variant="outline">
                            <VStack spacing={5}>
                                <FormControl variant="floating">
                                    <Input
                                        placeholder=" "
                                        type="email"
                                        id="input-email"
                                        name="email"
                                    />
                                    <FormLabel>Email</FormLabel>
                                </FormControl>
                                <FormControl variant="floating">
                                    <Input
                                        placeholder=" "
                                        type="password"
                                        id="input-password"
                                        name="password"
                                    />
                                    <FormLabel>Password</FormLabel>
                                </FormControl>
                                <Button
                                    colorScheme="gray"
                                    type="submit"
                                    size="md"
                                    width="30%"
                                >
                                    Login
                                </Button>
                                <HStack>
                                    <Button fontSize="sm" variant="link">Forgot Password</Button>
                                    <Text color="gray.400" fontWeight="semibold">|</Text>
                                    <Button fontSize="sm" variant="link">Register</Button>
                                </HStack>
                            </VStack>
                        </FormControl>
                    </VStack>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
