import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Restaurant() {
  return <div>Restaurant home</div>;
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  console.log(session);

  if (error) throw error;
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Retrieve provider_token & logged in user's third-party id from metadata
  const { provider_token, user } = session;

  console.log(user);
  if (user.user_metadata.account_type == "restaurant") {
    return {
      props: {},
    };
  } else if (user.user_metadata.account_type == "user") {
    return {
      redirect: {
        destination: "/home/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
