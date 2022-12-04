import { useRangeSlider } from "@chakra-ui/react";
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
  console.log(user);

  const combineOrders = {};

  for (let i = 0; i < user.orders.length; i++) {
    const id = user.orders[i];
    if (combineOrders[id]) {
      combineOrders[id] += 1;
    } else combineOrders[id] = 1;
  }

  const { data, error2 } = await supabase
    .from("deals")
    .select("id,price,name,restaurant_id,price_original")
    .in("id", Object.keys(combineOrders));

  for (const deal of data) {
    deal["count"] = combineOrders[deal.id];
  }

  console.log(data);

  res.status(200).json({
    orders: data,
  });
}
