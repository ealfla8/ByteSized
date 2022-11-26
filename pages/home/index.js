import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Box, Heading, Text, HStack, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import DealCard from "./DealCard";

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

  const groupDealsByRestaurant = (deals) => {
    const restaurants = {};

    deals.forEach((deal) => {
      if (!restaurants[deal.restaurant.id]) {
        const { restaurant, ...dealCopy } = deal;

        restaurants[restaurant.id] = {
          restaurant,
          deals: [dealCopy],
        };
      } else {
        const { restaurant, ...dealCopy } = deal;

        restaurants[restaurant.id].deals.push(dealCopy);
      }
    });
    console.log(restaurants);
    return restaurants;
  };

  return (
    <Box as="section" pt="90px" pb="198px" px="32px">
      <div>
        <Heading fontSize="50px" color="#334155">
          Second Chances near{" "}
          <span
            style={{
              color: "#d946ef",
              background: "linear-gradient(to right, #a855f7, #d946ef)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gainesville:
          </span>
        </Heading>
      </div>
      <HStack spacing="50px" pt="70px" justifyContent="start">
        {Object.entries(groupDealsByRestaurant(deals)).map(([key, value]) => (
          <Flex key={key}>
            {/* Restaurant card */}
            <Box
              mr="60px"
              px="10"
              py="8"
              rounded="xl"
              style={{ position: "relative" }}
              bg="rgba(0, 0, 0, 0.6)"
            >
              <Box
                rounded="xl"
                position="absolute"
                style={{
                  height: "100%",
                  width: "100%",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  backgroundImage:
                    "url('https://locations.tacobell.com/permanent-b0b701/assets/images/hero.9266f3de.jpg')",
                  backgroundSize: "cover",
                }}
              ></Box>
              <Box color="white">
                <Heading fontSize="3xl">{value.restaurant.name}</Heading>
                <Text fontSize="2xl" mt="1">
                  {value.deals.length} deals!
                </Text>
              </Box>
              <Box mt="10" color="white">
                <Text>100kg of carbon emissions saved</Text>
                <Text>{value.restaurant.address.split(",")[0]}</Text>
              </Box>
            </Box>
            {/* Deal row */}
            <div>
              {value.deals.map((deal) => (
                <div key={deal.id}>{deal.name}</div>
              ))}
            </div>
          </Flex>
        ))}
        {/* {deals.map((deal, i) => (
          <DealCard deal={deal} key={i} />
        ))} */}
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
