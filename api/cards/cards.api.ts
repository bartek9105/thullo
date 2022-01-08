import { supabase } from "../../utils/supabaseClient";

export const getCards = async () => {
  const { data } = await supabase.from("cards").select("*");
  return data;
};
