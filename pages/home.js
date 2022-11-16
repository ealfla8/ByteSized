import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Box, Heading, Text, HStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useUser();

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(
        "/api/get-user-deals?" +
          new URLSearchParams({
            user_id: user.id,
          })
      )
        .then((response) => response.json())
        .then((data) => setDeals(data.deals));
    }
  }, [user]);

  return (
    <Box as="section" pt="90px" pb="198px" px="32px">
      <center>
        <Heading fontSize="70px">
          Welcome to <i>A Second Chance.</i>
        </Heading>
        <Text fontSize="40px" pt="20px">
          Upcoming drops:
        </Text>
      </center>
      <HStack spacing="50px" pt="70px" justifyContent="center">
        {deals.map((deal, i) => (
          <Box bg="gray" w="400px" h="200px" key={i}>
            <center>
              <Image src="https://www.tacobell.com/images/28174_nacho_fries_deluxe_box_750x660.jpg" />
              <Text fontSize="40px" pt="16px">
                {deal.name} ${Number(deal.price).toFixed(2)}
              </Text>
            </center>
          </Box>
        ))}
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
  const { user } = session;

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
