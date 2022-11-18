import { Image, Input, Button, Divider, Heading } from "@chakra-ui/react";

export default function RestaurantView({ restaurant }) {
  console.log(restaurant);

  return (
    <div>
      <Heading>random text</Heading>

      <Image
        boxSize="200px"
        objectFit="cover"
        src="https://st.depositphotos.com/1064950/1282/i/950/depositphotos_12829992-stock-photo-restaurant-signage.jpg"
        alt="Example Restaurant Picture"
      />

      <Divider
        orientation="horizontal" /*the divider is because I don't know how to add spacing*/
      />

      <Button colorScheme="blue">Edit Profile</Button>
      <Divider orientation="horizontal" />

      <Button colorScheme="blue">Followers</Button>
      <Divider orientation="horizontal" />
      <Button colorScheme="blue">Write a post..</Button>
      <Divider orientation="horizontal" />
      <Divider orientation="horizontal" />
      <Input placeholder="Type your post here!" size="md" />
      <Button colorScheme="blue">Post</Button>
    </div>
  );
}
