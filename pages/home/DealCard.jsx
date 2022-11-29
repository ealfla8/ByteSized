import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

function price(number) {
  return Number(number).toFixed(2);
}

export default function DealCard({ deal }) {
  if (deal === undefined) return <div>yuh</div>;

  return (
    <Flex
      bg="gray"
      w="300px"
      h="160px"
      rounded="lg"
      bgImage="linear-gradient(to right bottom, rgba(153, 27, 27, 0.8), rgba(22, 101, 52, 0.8)), url('https://www.tacobell.com/images/28174_nacho_fries_deluxe_box_750x660.jpg')"
      bgSize="cover"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      px="3"
      textColor="white"
    >
      <Box alignSelf="end">
        <Text as="del" display="inline" mr="3">
          ${price(deal.price_original)}
        </Text>
        <Text display="inline">${price(deal.price)}</Text>
      </Box>
      <Heading fontSize="xl" mt="3">
        {deal.name}
      </Heading>
      <Text>3 left</Text>
      <Button size="sm" mt="3" textColor="black">
        Buy
      </Button>
    </Flex>
  );
}
