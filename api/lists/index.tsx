import { supabase } from "../../utils/supabaseClient";

type BoardList = {
  id: number;
  created_at: any;
  board_id: number;
  listName: string;
};

export const getBoardLists = async (boardId: number) => {
  const { data } = await supabase
    .from<BoardList>("lists")
    .select("*")
    .eq("board_id", boardId);

  return data;
};

export const postBoardList = async (listName: string, boardId: number) => {
  return await supabase.from("lists").insert([{ listName, board_id: boardId }]);
};
