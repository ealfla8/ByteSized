import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  Box,
  Heading,
  Text,
  HStack,
  Image,
  Flex,
  Grid, VStack, Tabs, TabList, Tab, TabPanels, TabPanel,
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
          minH="100vh"
          height="100vh"
          w="full"
          justifyContent="center"
          spacing={5}
      >
        <Box maxW="1200px" w="100%">
          <VStack>
            <Flex justify="center">
              <Heading fontSize="5xl" color="#0f172a">
                Second Chances near{" "}
                <span
                    style={{
                      color: "#4299E1",
                      background: "linear-gradient(to right, #9F7AEA, #4299E1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                >
                Gainesville
              </span>
              </Heading>
            </Flex>
            <Heading>· · ────────────── ·𖥸· ────────────── · ·</Heading>
          </VStack>

          <Tabs align='center' size='lg' isFitted variant='soft-rounded' colorScheme='gray'>
            <Box bg="gray.700" rounded={100}>
              <TabList>
                <Tab color="white">Orders</Tab>
                <Tab color="white">Following</Tab>
              </TabList>
            </Box>

            <TabPanels>
              {/* Orders Tab */}
              <TabPanel>
                <Flex flexDir={"row"}>
                  {orders.map((order) => (
                      <Box
                          key={order.id}
                          bg="white"
                          rounded="xl"
                          boxShadow="base"
                          border="1px"
                          borderColor="gray.200"
                          padding={30}
                          marginLeft={4}
                          marginRight={4}
                          width="30%"
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
              </TabPanel>

              {/* Following tab */}
              <TabPanel>
                <HStack spacing="50px" justifyContent="start">
                  {Object.entries(groupDealsByRestaurant(deals)).map(([key, value]) => (
                      <Flex key={key}>
                        {/* Restaurant card */}
                        <Flex
                            mr={5}
                            px="10"
                            py="8"
                            rounded="xl"
                            bg="rgba(0, 0, 0, 0.6)"
                            style={{ position: "relative" }}
                            flexDir="column"
                            justifyContent="space-between"
                            maxH="100%"
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
                                    "linear-gradient(to right bottom, " +
                                    "rgba(239, 68, 68, 0.5), " +
                                    "rgba(4, 120, 87, 0.5)), " +
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
              </TabPanel>
            </TabPanels>
          </Tabs>
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
