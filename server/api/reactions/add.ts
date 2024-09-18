import { defineEventHandler, readBody } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  const { radio_id, reaction_type } = body;

  const { data, error } = await client
    .from("reactions")
    // @ts-ignore
    .insert([{ radio_id, reaction_type }]);

  if (error && !data) {
    console.error("Error adding reaction:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
});
