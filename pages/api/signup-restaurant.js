// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const bodyData = JSON.parse(req.body);
  const { data, error } = await supabase.auth.signUp({
    email: bodyData.email,
    password: bodyData.password,
    options: {
      data: {
        account_type: "restaurant",
      },
    },
  });

  if (error) {
    res.status(403).json({ error });
  } else {
    const { error: supabaseError } = await supabase.from("restaurants").insert({
      id: data.user.id,
      email: bodyData.email,
      name: bodyData.name,
      lat: bodyData.latitude,
      lng: bodyData.longitude,
      address: bodyData.address,
    });
    res.status(200).end();
  }
}
