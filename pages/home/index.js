import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  Box,
  Heading,
  Text,
  HStack,
  Image,
  Flex,
  Grid,
} from "@chakra-ui/react";
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
    <Flex
      as="section"
      pt="90px"
      pb="198px"
      px="32px"
      w="full"
      justifyContent="center"
    >
      <Box maxW="1200px" w="100%">
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
        <Heading mt="70px" mb="20px">
          Your restaurants:
        </Heading>
        <HStack spacing="50px" justifyContent="start">
          {Object.entries(groupDealsByRestaurant(deals)).map(([key, value]) => (
            <Flex key={key}>
              {/* Restaurant card */}
              <Flex
                mr="60px"
                px="10"
                py="8"
                rounded="xl"
                bg="rgba(0, 0, 0, 0.6)"
                style={{ position: "relative" }}
                flexDir="column"
                justifyContent="space-between"
                maxH="250px"
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
                      "linear-gradient(to right bottom, rgba(239, 68, 68, 0.5), rgba(4, 120, 87, 0.5)), url('https://locations.tacobell.com/permanent-b0b701/assets/images/hero.9266f3de.jpg')",
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
                  <Text>
                    <span style={{ textDecoration: "underline" }}>100kg</span>{" "}
                    of carbon emissions saved
                  </Text>
                  <Text>{value.restaurant.address.split(",")[0]}</Text>
                </Box>
              </Flex>
              {/* Deal row */}
              <Grid gap="5">
                {value.deals.map((deal) => (
                  <DealCard deal={deal} key={deal.id} />
                ))}
              </Grid>
            </Flex>
          ))}
        </HStack>
      </Box>
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
