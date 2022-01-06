import { ReactElement, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BoardLayout from "../../components/Layout/BoardLayout";
import ColumnDroppable from "../../modules/Board/components/ColumnDroppable";
import { supabase } from "../../utils/supabaseClient";

const BoardPage = () => {
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
    let { data: lists, error } = await supabase.from("lists").select("*");
    setLists(lists);
  };

  const getCards = async () => {
    let { data: cards, error } = await supabase.from("cards").select("*");
    setCards(cards);
  };

  const cardsByList = lists.map((list: any) => {
    const cardsByList = cards.filter((card: any) => card.list_id === list.id);
    return { ...list, cards: cardsByList };
  });

  return (
    <>
      {winReady && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", gap: 96 }}>
            {cardsByList.map(({ id, listName, cards }: any, index: number) => (
              <ColumnDroppable
                key={index}
                title={listName}
                cardData={cards}
                droppableId={`${id}`}
              />
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

BoardPage.getLayout = (page: ReactElement) => <BoardLayout>{page}</BoardLayout>;

export default BoardPage;
