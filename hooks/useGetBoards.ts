import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import type { Board } from "../types/Board";

export const useGetBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchBoards = async () => {
    const { data, error } = await supabase.from("boards").select("*");
    setBoards(data || []);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, fetchBoards };
};
