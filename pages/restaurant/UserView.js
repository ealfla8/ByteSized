import { Grid, GridItem, Flex, Box, Image } from "@chakra-ui/react";

export default function UserView({ restaurant }) {
  console.log(restaurant);

  return (
    <Grid templateColumns="500px 1fr" minH={"100vh"}>
      <GridItem h="100%">
        <Flex flexDirection="column" alignItems="center">
          <Image
            src={restaurant.profile_pic}
            h="150px"
            w="150px"
            marginTop={"20px"}
          ></Image>
          <Box>hi2</Box>
          <Box>hi3</Box>
        </Flex>
      </GridItem>
      <GridItem h="100%" bg="green" />
    </Grid>
  );
}
