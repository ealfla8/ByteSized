import {useRouter} from "next/router";
import {Button, Flex, Heading, Text, VStack} from "@chakra-ui/react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function ResetSuccess() {
    const router = useRouter();
    const supabase = useSupabaseClient();

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
                    <Heading size="md">Password reset success!</Heading>
                    <Heading size="sm">Please login using your newly created password.</Heading>
                    <Button
                        colorScheme="gray"
                        type="submit"
                        size="md"
                        width="30%"
                        onClick={() => {router.push('/')}}
                    >
                        Back to Home
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    );
}