import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

function price(number) {
  return Number(number).toFixed(2);
}

export default function DealCard({ deal, userId }) {
  // console.log(deal);

  function onByClick()
  {
    console.log("here");
    
    fetch("/api/user-buy?" +
    new URLSearchParams({
      deal:deal.id,
      user:userId,
    }))
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  
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
      <Text>{deal.count} left</Text>
      <Button size="sm" mt="3" textColor="black" onClick={onByClick}>
        Buy
      </Button>
    </Flex>
  );
}
