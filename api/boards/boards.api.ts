import { supabase } from "../../utils/supabaseClient";

export const getBoards = async () => {
  const { data } = await supabase.from("boards").select("*");
  return data;
};

export type PostBoardConfig = {
  title: string;
  img_url: string;
  isPrivate: boolean;
};

export const postBoard = async ({
  title,
  img_url,
  isPrivate,
}: PostBoardConfig) => {
  return await supabase
    .from("boards")
    .insert([{ title, img_url: img_url, isPrivate }]);
};
