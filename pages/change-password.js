import {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack} from "@chakra-ui/react";

export default function ForgotPassword() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    const [hash, setHash] = useState(null);
    const [message, setMessage] = useState("");
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    // useEffect(() => {
    //     setHash(window.location.hash);
    // }, []);
    //
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitLoading(true);

        const newPass = new FormData(e.target).get("newPassword").toString();

        try {
            if (!hash) {
                alert("Invalid token.");
            } else if (hash) {
                const hashArr = hash
                    .substring(1)
                    .split("&")
                    .map((param) => param.split("="));
            }

            let type;
            let accessToken;

            for (const [key, value] of hashArr) {
                if (key === "type") {
                    type = value;
                } else if (key === "access_token") {
                    accessToken = value;
                }
            }

            if (type !== "recovery" || !accessToken || typeof accessToken === "object") {
                alert("Invalid access token / type.");
            } else {
                const { error } = await supabase.auth.updateUser(accessToken, {
                    password: newPass,
                });

                if (error) {
                    alert(error.message);
                } else {
                    alert("Success");
                }
            }
        } catch (e) {
            alert(e.message);
        }

    }

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
                    <Heading size="md">Please enter your new password</Heading>
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
                                    type="password"
                                    id="input-password"
                                    name="newPassword"
                                    required
                                />
                                <FormLabel>New Password</FormLabel>
                            </FormControl>
                            <Button
                                colorScheme="gray"
                                type="submit"
                                size="md"
                                width="30%"
                                isLoading={isSubmitLoading}
                            >
                                Submit
                            </Button>
                        </VStack>
                    </FormControl>
                </VStack>
            </Flex>
        </Flex>
    );

}