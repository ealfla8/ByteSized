import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { UnorderedList, ListItem } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("/api/get-restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data.restaurants));
  }, []);

  return (
    <div>
      <UnorderedList>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <Link href={`/restaurant/${restaurant.id}`}>
              {restaurant.name ?? "No name"} -{" "}
              {restaurant.address ?? "No address"}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
}
