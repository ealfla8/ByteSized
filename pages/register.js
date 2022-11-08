import {
    FormControl,
    Input,
    Flex,
    Container,
    Button,
    Text,
    VStack,
    Heading,
    Select
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {error} from "next/dist/build/output/log";

export default function Register() {
    const [errorMessage, setErrorMessage] = useState("");

    const supabase = useSupabaseClient();
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        fetch("/api/signup", {
            method: 'POST', body: JSON.stringify({email: formData.get("email"), password: formData.get("password")})
        }).then((response) => {
            if (response.ok) {
                supabase.auth
                    .signInWithPassword({
                        email: formData.get("email"), password: formData.get("password"),
                    })
                    .then((user, error) => {
                        router.push("/home");
                    });
            } else {
                response.json().then(data => setErrorMessage(data.error.message));
            }
        })
    };

    return (<Flex alignItems="center" minH="100vh" h="100%">
            <Container
                direction={"column"}
                background={"gray.700"}
                padding={7}
                rounded={50}
                position={"relative"}
                width={"50%"}
            >
                <VStack spacing={5} marginTop={5}>
                    <Heading color={"white"} size={"xl"}>A Second Chance</Heading>
                    <Heading color={"white"} size={"md"}>User Registration</Heading>
                    <FormControl as="form" onSubmit={onSubmit}>
                        <VStack spacing={5} margin={3}>
                            <Select
                                placeholder={"Register as:"}
                                required
                                width={"80%"}
                                bgColor={"white"}
                                variant={"outline"}
                            >
                                <option value={"customer"}>Customer</option>
                                <option value={"store"}>Store</option>
                            </Select>
                            <Input
                                placeholder={"Name"}
                                type={"name"}
                                id={"input-name"}
                                name={"name"}
                                required
                                width={"80%"}
                                bgColor={"white"}
                                variant={"outline"}
                            />
                            <Input
                                placeholder={"Email"}
                                type={"email"}
                                id={"input-email"}
                                name={"email"}
                                required
                                width={"80%"}
                                bgColor={"white"}
                                variant={"outline"}
                            />
                            <Input
                                placeholder={"Username"}
                                type={"username"}
                                id={"input-username"}
                                name={"username"}
                                required
                                width={"80%"}
                                bgColor={"white"}
                                variant={"outline"}
                            />
                            <Input placeholder={"Password"}
                                   type={"password"}
                                   id={"input-password"}
                                   name={"password"}
                                   required
                                   width={"80%"}
                                   bgColor={"white"}
                                   variant={"outline"}
                            />
                            <Button type="submit">Create Account</Button>
                        </VStack>
                    </FormControl>
                </VStack>
                <Text color={"white"}>
                    {errorMessage}
                </Text>
            </Container>
        </Flex>
    );
}
