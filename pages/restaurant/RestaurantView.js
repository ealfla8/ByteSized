import {
  Image,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Flex,
  Center,
  VStack,
} from "@chakra-ui/react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function RestaurantView({ restaurant }) {

  const supabase = useSupabaseClient();

  if (restaurant === undefined) return <div>Yuh</div>;

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
    <Flex
        bg="gray.700"
        as="section"
        pt={10}
        pb={10}
        minH="100vh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        spacing={5}
    >
      <VStack>
        <Heading size="3xl" color="gray.50">A Second Chance</Heading>
        <Heading color="gray.50">· · ────────────── ·𖥸· ────────────── · ·</Heading>

        <Grid
            templateAreas={`"nav main"`}
            gridTemplateRows={'100% 1fr 60%'}
            gridTemplateColumns={'40% 1fr'}
            h="100%"
            w="100%"
            gap={5}
        >
          <GridItem bg="gray.500" area={"nav"} rounded={40}>
            <VStack spacing={7} mt={5} mb={5}>
              <Heading size="xl"> {restaurant.name}</Heading>
              <Image
                boxSize="200px"
                objectFit="cover"
                src="https://st.depositphotos.com/1064950/1282/i/950/depositphotos_12829992-stock-photo-restaurant-signage.jpg"
                alt="Example Restaurant Picture"
                rounded={15}
              />

              <Heading size="sm"> {restaurant.address} </Heading>

              <Button
                  colorScheme="gray"
                  type="submit"
                  size="md"
                  width="30%"
              >
                Edit Profile
              </Button>

              <Button
                  colorScheme="gray"
                  type="submit"
                  size="md"
                  width="30%"
              >
                Followers
              </Button>

              <Button
                  colorScheme="gray"
                  type="submit"
                  size="md"
                  width="30%"
                  onClick={() => {
                    supabase.auth.signOut().then((r) => {
                      console.log(r);
                      window.location.assign("/");
                    })
                  }}
              >
                Logout
              </Button>
            </VStack>
          </GridItem>

          <GridItem bg="gray.50" area={"main"} rounded={40}>
            <Flex
                alignItems="center"
                justifyContent="center"
                position="relative"
                minH="full"
                height="full"
            >
              <Center>
                  <FormControl as="form" onSubmit={onCreateClick}>
                    <VStack spacing={7} mt={5} mb={5}>
                    <FormControl variant="floating">
                      <Input
                          placeholder=" "
                          name="itemName"
                      />
                      <FormLabel>Item Name</FormLabel>
                    </FormControl>
                    <FormControl variant="floating">
                      <Input
                          placeholder=" "
                          name="oldPrice"
                      />
                      <FormLabel>Old Price</FormLabel>
                    </FormControl>
                    <FormControl variant="floating">
                      <Input
                          placeholder=" "
                          name="newPrice"
                      />
                      <FormLabel>New Price</FormLabel>
                    </FormControl>
                    <FormControl variant="floating">
                      <Input
                          placeholder=" "
                          name="quantity"
                      />
                      <FormLabel>Quantity</FormLabel>
                    </FormControl>
                    <Button type="submit">
                      Create Deal
                    </Button>
                    </VStack>
                  </FormControl>
              </Center>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  );
}
