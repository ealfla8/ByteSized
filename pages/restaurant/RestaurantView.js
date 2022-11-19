import { Image, Input, Button, Divider, Heading } from "@chakra-ui/react";
import {
  SimpleGrid,
  Grid,
  GridItem,
  Box,
  Flex,
  Spacer,
  Center,
  Square,
  Text,
} from "@chakra-ui/react";

export default function RestaurantView({ restaurant }) {
  console.log(restaurant);

  return (
    <div>
      <Grid h="100vh" templateColumns="500px 1fr" gap={4}>
        <GridItem bg="papayawhip">
          <Center>
            <Heading>Restaurant Name</Heading>
          </Center>
          <Center w="500px" marginTop="50px">
            <Image
              boxSize="200px"
              objectFit="cover"
              src="https://st.depositphotos.com/1064950/1282/i/950/depositphotos_12829992-stock-photo-restaurant-signage.jpg"
              alt="Example Restaurant Picture"
            />
          </Center>

          <Flex color="white" flexDirection="column" alignItems="center">
            <Center w="250px" h="50px" marginTop="50px">
              <Button borderRightRadius="0" color="tomato">
                Edit Profile
              </Button>
            </Center>

            <Center w="250px" h="50px" marginTop="50px">
              <Button borderRightRadius="0" color="tomato">
                Followers
              </Button>
            </Center>

            <Center w="250px" h="50px" marginTop="50px">
              <Button borderRightRadius="0" color="tomato">
                <Text>Write a post..</Text>
              </Button>
            </Center>
          </Flex>

          {/* <Heading>{restaurant.email}</Heading> */}
        </GridItem>

        <GridItem bg="tomato">right col</GridItem>
      </Grid>
    </div>
  );
}
