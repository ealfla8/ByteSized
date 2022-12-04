import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", req.query.user_id)
    .single();

  if (!user.following_restaurants) {
    res.status(200).json({
      deals: [],
    });
    return;
  }

  const deals = [];
  for (let i = 0; i < user.following_restaurants.length; i++) {
    const restaurantId = user.following_restaurants[i];

    const { data, error } = await supabase
      .from("deals")
      .select("price_original, price, name, id, count")
      .eq("restaurant_id", restaurantId);
    const restaurant = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", restaurantId)
      .single();

    data.map((deal) => deals.push({ ...deal, restaurant: restaurant.data }));
  }

  res.status(200).json({
    deals: deals,
  });
}
