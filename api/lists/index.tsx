import { supabase } from "../../utils/supabaseClient";

type Card = {
  id: number;
  title: string;
};

type List = {
  id: number;
  cards: Card[];
  listName: string;
};

type BoardList = {
  id: number;
  img_url: string | null;
  lists: List[];
  title: string;
};

export const getBoardLists = async (boardId: number) => {
  const { data } = await supabase
    .from<BoardList>("boards")
    .select("id, title, img_url, lists ( id, listName, cards (id, title) )")
    .eq("id", boardId);

  return data;
};

export const postBoardList = async (listName: string, boardId: number) => {
  return await supabase.from("lists").insert([{ listName, board_id: boardId }]);
};

export const postListCard = async (cardData: any, listId: number) => {
  return await supabase
    .from("cards")
    .insert([{ ...cardData, list_id: listId }]);
};

export const removeBoardList = async (listId: number) => {
  return await supabase.from("lists").delete().eq("id", listId);
};
