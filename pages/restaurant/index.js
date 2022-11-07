import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Restaurant() {
  const supabase = useSupabaseClient();
  const user = useUser();

  console.log(user);

  return <div>Restaurant home</div>;
}
