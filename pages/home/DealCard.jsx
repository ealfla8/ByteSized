import { Box, Heading, Text, HStack, Image } from "@chakra-ui/react";

export default function DealCard({ deal }) {
  // console.log(deal);

  return (
    <Box bg="red" w="300px" h="200px"></Box>
    // <Box bg="gray" w="400px" h="200px">
    //   <center>
    //     <Image src="https://www.tacobell.com/images/28174_nacho_fries_deluxe_box_750x660.jpg" />
    //     <Text fontSize="40px" pt="16px">
    //       {deal.name} ${Number(deal.price).toFixed(2)}
    //     </Text>
    //   </center>
    // </Box>
  );
}
