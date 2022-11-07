import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Box, Heading, Text, Stack, HStack} from "@chakra-ui/react"

export default function Home() {
  const supabase = useSupabaseClient();
  const user = useUser();

  console.log(user);

  return (
    <Box
      as="section"
      pt='90px'
      pb='198px'
      px='32px'
    >
      <center>
      <Heading fontSize = '70px'>
        Welcome to <i>A Second Chance.</i>
      </Heading>
      <Text fontSize = '40px' pt="20px">
        Upcoming drops:
      </Text>
      </center>
      <HStack spacing="50px" pt="70px">
        <Box bg='gray' w="400px" h="200px">
          <center>
          <Text fontSize = '40px' pt="16px">
          Taco Shells $3.99
          </Text>
          </center>
        </Box>
        <Box bg='gray' w="400px" h="200px">
          <center>
          <Text fontSize = '40px' pt="16px">
          Taco Shells $3.99
          </Text>
          </center>
        </Box>
        <Box bg='gray' w="400px" h="200px">
          <center>
          <Text fontSize = '40px' pt="16px">
          Taco Shells $3.99
          </Text>
          </center>
        </Box>
      </HStack>
    
    </Box>
    
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Retrieve provider_token & logged in user's third-party id from metadata
  const { provider_token, user } = session;

  console.log(user);
  if (user.user_metadata.account_type == "user") {
    return {
      props: {},
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
