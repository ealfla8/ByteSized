import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import RestaurantView from "./RestaurantView";
import UserView from "./UserView";

export default function RestaurantPage(props) {
  const router = useRouter();
  const { id } = router.query;

  const supabase = useSupabaseClient();
  const user = useUser();

  const page = () => {
    if (user && user.user_metadata.account_type == "restaurant")
      return <RestaurantView restaurant={props.restaurant} />;
    else if (user && user.user_metadata.account_type == "user")
      return <UserView restaurant={props.restaurant} />;

    return <div></div>;
  };

  return page();
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", ctx.params.id)
    .single();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      restaurant: data,
    },
  };
}
