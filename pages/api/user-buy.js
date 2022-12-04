import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log(req.query.deal);

  console.log(req.query.user);

  const { data: currentCount, error } = await supabase
    .from("deals")
    .select("count")
    .eq("id", req.query.deal)
    .single();

  console.log(currentCount);

  if (currentCount.count >= 1) {
    const { data: dataUpdate } = await supabase
      .from("deals")
      .update({ count: currentCount.count - 1 })
      .eq("id", req.query.deal);

    console.log(dataUpdate);

    const { data: userOrder } = await supabase
      .from("users")
      .select("orders")
      .eq("id", req.query.user)
      .single();
    console.log(userOrder);

    const { data: orderUpdate, error2 } = await supabase
      .from("users")
      .update({ orders: [...userOrder.orders, req.query.deal] })
      .eq("id", req.query.user);

    console.log(orderUpdate);
    res.status(200).json({ deals: dataUpdate });
  } else {
    res.status(400).json({ message: "Product has sold out." });
  }
}
