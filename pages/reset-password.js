import {useState} from 'react'
import {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack} from "@chakra-ui/react";

export default function VerifyEmail() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    const [message, setMessage] = useState("");
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitLoading(true);

        const formData = new FormData(e.target).get("newPassword").toString();

        const { data, error } = await supabase.auth.updateUser({ password: formData })

        setIsSubmitLoading(false);

        if (data) {
            supabase.auth.signOut().then(() => {
                window.location.assign("/reset-success");
            })
        }
        else if (error) {
            setMessage("There was an error updating your password.");
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
                    <Text fontSize="xs" color="red.500">{message}</Text>
                </VStack>
            </Flex>
        </Flex>
    );
}