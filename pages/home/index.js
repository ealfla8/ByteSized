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

  console.log(user);

  const [deals, setDeals] = useState([]);
  const [orders, setOrders] = useState([]);

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
      fetch(
        "/api/get-user-orders?" +
          new URLSearchParams({
            user_id: user.id,
          })
      )
        .then((response) => response.json())
        .then((data) => setOrders(data.orders));
      // .then((data) => console.log(data.orders));
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
      {/* Blur 1 */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: -200,
          right: 0,
          height: "100%",
          filter: "blur(64px)",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <svg
          style={{ height: "40rem", transform: "rotate(30deg)" }}
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          ></path>
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC"></stop>
              <stop offset="1" stopColor="#FF80B5"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Blur 2 */}
      <div
        style={{
          position: "absolute",
          height: "100%",
          bottom: "-300px",
          right: "-800px",
          left: 0,
          filter: "blur(64px)",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <svg
          style={{ height: "40rem", transform: "translateX(500px)" }}
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          ></path>
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC"></stop>
              <stop offset="1" stopColor="#FF80B5"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Box maxW="1200px" w="100%">
        <div>
          <Heading fontSize="50px" color="#0f172a">
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
          Orders:
        </Heading>
        {/* Orders */}
        <Flex flexDir={"row"}>
          {orders.map((order) => (
            <Box
              key={order.id}
              bg="white"
              rounded="xl"
              boxShadow="base"
              border="1px"
              borderColor="gray.200"
              padding={"30px"}
              marginRight={"20px"}
              position="relative"
            >
              <Heading fontSize="2xl">{order.name}</Heading>
              <Box color="black" display="inline-block">
                <Text fontSize="xl" mt="1">
                  count: {order.count}
                </Text>
              </Box>
              <Box mt="10" color="black">
                <Text>
                  Cost: ${Number(order.price * order.count).toFixed(2)}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>

        {/* Restaraunts */}
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
                roundedTop="xl"
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
                  <DealCard
                    deal={deal}
                    key={deal.id}
                    userId={user.id}
                    onDealClick={(deal) => {
                      console.log(orders);
                      const orderCopy = [...orders];
                      const order = orderCopy.find((e) => e.id === deal.id);
                      order.count += 1;
                      setOrders(orderCopy);

                      const dealCopy = [...deals];
                      const newDeal = dealCopy.find((e) => e.id === deal.id);
                      newDeal.count -= 1;
                      setDeals(dealCopy);
                    }}
                  />
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
        destination: `/restaurant/${user.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
