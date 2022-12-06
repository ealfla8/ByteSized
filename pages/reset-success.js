import {Button, Flex, Heading, VStack} from "@chakra-ui/react";

export default function ResetSuccess() {
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
                        size="md"
                        width="30%"
                        onClick={() => {
                            window.location.assign("/login");
                        }}
                    >
                        Back to Login
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    );
}