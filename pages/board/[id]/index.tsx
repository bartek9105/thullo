import { ReactElement, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BoardLayout from "../../../components/Layout/BoardLayout";
import ColumnDroppable from "../../../modules/Board/components/ColumnDroppable";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./Board.module.scss";
import { useRouter } from "next/router";
import AddButton from "../../../modules/Board/components/AddButton";
import AddBoardListForm from "../../../modules/Board/forms/AddBoardListForm";
import ClientOnly from "../../../components/ClientOnly";

const BoardPage = () => {
  const [showNewListInput, setShowNewListInput] = useState(false);
  const { query } = useRouter();
  const boardId = query.id;

  const onDragEnd = () => {};

  const [lists, setLists] = useState<[] | any>([]);
  const [cards, setCards] = useState<[] | any>([]);

  const handleSubmit = async ({ listName }: any) => {
    const { data, error } = await supabase
      .from("lists")
      .insert([{ listName, board_id: boardId }]);
  };

  useEffect(() => {
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
    <ClientOnly>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.boardContainer}>
            {cardsByList?.map(({ id, listName, cards }: any, index: number) => (
              <ColumnDroppable
                key={index}
                title={listName}
                cardData={cards}
                droppableId={`${id}`}
              />
            ))}
            <div style={{ height: "fit-content", width: 243 }}>
              {!showNewListInput && (
                <AddButton
                  className={styles.button}
                  onClick={() => setShowNewListInput(true)}
                >
                  Add new list
                </AddButton>
              )}
              {showNewListInput && (
                <AddBoardListForm handleSubmit={handleSubmit} />
              )}
            </div>
          </div>
        </DragDropContext>
      </div>
    </ClientOnly>
  );
};

BoardPage.getLayout = (page: ReactElement) => <BoardLayout>{page}</BoardLayout>;

export default BoardPage;
