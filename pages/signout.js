import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Signout() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  supabase.auth.signOut().then(() => {
    router.push("/");
  });

  return <div>signout</div>;
}
