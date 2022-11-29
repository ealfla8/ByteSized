import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log(req.query.deal);

  const { data: currentCount, error } = await supabase
    .from("deals")
    .select("count")
    .eq("id", req.query.deal)
    .single();

  console.log(currentCount);

  const { dataUpdate, errorUpdate } = await supabase
    .from("deals")
    .update({ count: currentCount.count - 1 })
    .eq("id", req.query.deal);

  console.log(dataUpdate);
  res.status(200).json({ deals: dataUpdate });
}
