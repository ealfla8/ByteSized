import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Restaurant() {
  useEffect(() => {
    fetch("/api/get-restaurants")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <div>Restaurant home</div>;
}
