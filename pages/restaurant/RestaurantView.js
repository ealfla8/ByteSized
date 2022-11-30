import {
  Image,
  Input,
  Button,
  Divider,
  Heading,
  FormControl,
} from "@chakra-ui/react";
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
  Stack,
} from "@chakra-ui/react";

export default function RestaurantView({ restaurant }) {
  function onCreateClick(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData.get("itemName"));

    fetch("/api/create-new-deal", {
      method: "POST",
      body: JSON.stringify({
        itemName: formData.get("itemName"),
        oldPrice: formData.get("oldPrice"),
        newPrice: formData.get("newPrice"),
        quantity: formData.get("quantity"),
        id: restaurant.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <Grid h="100vh" templateColumns="500px 1fr" gap={4}>
        <GridItem bg="papayawhip">
          <Center>
            <Heading> {restaurant.name}</Heading>
          </Center>
          <Center>
            <Image
              boxSize="200px"
              objectFit="cover"
              src="https://st.depositphotos.com/1064950/1282/i/950/depositphotos_12829992-stock-photo-restaurant-signage.jpg"
              alt="Example Restaurant Picture"
            />
          </Center>
          <Center>
            <Text> {restaurant.address} </Text>
          </Center>

          <Flex color="white" flexDirection="column" alignItems="center">
            <Center w="250px" h="50px" marginTop="50px">
              <Button borderRightRadius="0" color="black">
                Edit Profile
              </Button>
            </Center>

            <Center w="250px" h="50px" marginTop="50px">
              <Button borderRightRadius="0" color="black">
                Followers
              </Button>
            </Center>
          </Flex>

          {/* <Heading>{restaurant.email}</Heading> */}
        </GridItem>

        <GridItem bg="tomato">
          <Center>
            <Stack spacing={3}>
              <FormControl as="form" onSubmit={onCreateClick}>
                <Input placeholder="Item Name" size="md" name="itemName" />
                <Input placeholder="Old Price" size="md" name="oldPrice" />
                <Input placeholder="New Price" size="md" name="newPrice" />
                <Input placeholder="Quantity" size="md" name="quantity" />
                <Center>
                  <Button type="submit">Create this deal!</Button>
                </Center>
              </FormControl>
            </Stack>
          </Center>
        </GridItem>
      </Grid>
    </div>
  );
}
