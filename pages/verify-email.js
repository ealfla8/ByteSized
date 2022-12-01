import {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Link, Text, VStack} from "@chakra-ui/react";

export default function VerifyEmail() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    const [message, setMessage] = useState("");
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword,
                })

                if (data) alert("Password updated successfully!")
                if (error) alert("There was an error updating your password.")
            }
        })
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitLoading(true);

        const email = new FormData(e.target).get("email").toString();

        try {
            const {data, error} = await supabase
                .from("users")
                .select("email")
                .eq("email", email)
                .single();

            setIsSubmitLoading(false);

            if (data) {
                try {
                    const { data: dataVal, error: err } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: kIsWeb ? null : 'io.supabase.flutter://reset-callback/'
                    });
                    if (dataVal) {
                        setMessage("A password reset link was sent to " + email + ".");
                    } else {
                        setMessage(err.message);
                    }
                } catch (e) {
                    setMessage(e.message);
                }
            } else if (error) {
                setMessage("There is no account associated with this email.");
            }
        } catch (e) {
            setMessage(e.message);
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
                    <Heading size="md">Please enter your email</Heading>
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
                                    type="email"
                                    id="input-email"
                                    name="email"
                                    required
                                />
                                <FormLabel>Email</FormLabel>
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