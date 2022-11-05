import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const supabase = useSupabaseClient();
  const user = useUser();

  console.log(user);

  return <div>User home</div>;
}
