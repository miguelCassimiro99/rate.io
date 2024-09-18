import { defineEventHandler, getQuery } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { radio_id } = getQuery(event);

  // @ts-ignore
  const { data, error } = await client.rpc("get_reactions_for_radio", {
    p_radio_id: radio_id,
  });

  if (error) {
    console.error("Error fetching reactions:", error);
    return { success: false, error: error.message };
  }

  return { success: true, reactions: data };
});
