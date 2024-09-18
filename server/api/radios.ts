import { defineEventHandler } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), 7, 31);

  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const startOfDayISO = startOfDay.toISOString();
  const endOfDayISO = endOfDay.toISOString();

  const { data: radios, error } = await client
    .from("radios")
    .select("*")
    .gte("created_at", startOfDayISO)
    .lt("created_at", endOfDayISO)
    .order("created_at", { ascending: false });

  if (error) return [];

  return radios;
});
