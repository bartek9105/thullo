import { ReactElement, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BoardLayout from "../../../components/Layout/BoardLayout";
import ColumnDroppable from "../../../modules/Board/components/ColumnDroppable";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./Board.module.scss";
import { useRouter } from "next/router";

const BoardPage = () => {
  const { query } = useRouter();
  const boardId = query.id;

  const onDragEnd = () => {};

  const [winReady, setWinReady] = useState(false);

  const [lists, setLists] = useState<[] | any>([]);
  const [cards, setCards] = useState<[] | any>([]);

  useEffect(() => {
    setWinReady(true);
    getLists();
    getCards();
  }, []);

  const getLists = async () => {
    let { data: lists, error } = await supabase
      .from("lists")
      .select("*")
      .eq("board_id", boardId);

    setLists(lists);
  };

  const getCards = async () => {
    let { data: cards, error } = await supabase.from("cards").select("*");
    setCards(cards);
  };

  const cardsByList = lists?.map((list: any) => {
    const cardsByList = cards?.filter((card: any) => card.list_id === list.id);
    return { ...list, cards: cardsByList };
  });

  return (
    <>
      {winReady && (
        <div className={styles.container}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.boardContainer}>
              {cardsByList?.map(
                ({ id, listName, cards }: any, index: number) => (
                  <ColumnDroppable
                    key={index}
                    title={listName}
                    cardData={cards}
                    droppableId={`${id}`}
                  />
                )
              )}
            </div>
          </DragDropContext>
        </div>
      )}
    </>
  );
};

BoardPage.getLayout = (page: ReactElement) => <BoardLayout>{page}</BoardLayout>;

export default BoardPage;
