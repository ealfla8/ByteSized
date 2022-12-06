import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/router";
import {Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Link, Text, VStack} from "@chakra-ui/react";
import {NextLink} from "next/link";

export default function Home() {
  const router = useRouter();
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
            width="60%"
            textColor="gray.700"
        >
          <VStack spacing={5} marginTop={5} marginBottom={5}>
            <Heading size="xl">A Second Chance</Heading>
            <Heading size="md">Thanks for taking the first step in reducing food waste!</Heading>
            <Heading size="md">· · ──────── ·𖥸· ──────── · ·</Heading>
            <Button
                colorScheme="gray"
                size="md"
                width="40%"
                onClick={() => {
                  router.push("/login")
                }}
            >
              Login
            </Button>
            <Heading size="md"></Heading>
            <Heading size="md">Don't have an account?</Heading>
            <Heading size="sm">Register as:</Heading>
            <Button
              colorScheme="gray"
              size="md"
              width="40%"
              onClick={() => {
                router.push("/register-customer")
              }}
            >
              Customer
            </Button>
            <Button
                colorScheme="gray"
                size="md"
                width="40%"
                onClick={() => {
                  router.push("/register-restaurant")
                }}
            >
              Restaurant
            </Button>
          </VStack>
        </Flex>
      </Flex>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  if (!session) return { props: {} };

  // Retrieve provider_token & logged in user's third-party id from metadata
  const { provider_token, user } = session;

  console.log(user);
  if (user.user_metadata.account_type == "user") {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else if (user.user_metadata.account_type == "restaurant") {
    return {
      redirect: {
        destination: "/restaurant/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
