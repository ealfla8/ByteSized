import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const data = JSON.parse(req.body);
  console.log(data);

  const { error } = await supabase.from("restaurants").insert({
    name: data.itemName,
    price: data.newPrice,
    price_original: data.oldPrice,
    count: data.quantity,
    restaurant_id: restaurant.id,
  });

  res.status(200).json({ test: "hello " });
}
