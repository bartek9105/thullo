import { ReactElement, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Board from "../../components/Board";
import BoardLayout from "../../components/Layout/BoardLayout";
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
              <div key={index}>
                <h1>{listName}</h1>
                <Droppable droppableId={`${id}`}>
                  {(provided) => (
                    <>
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.length > 0 &&
                          cards.map(({ id, title }: any, index: number) => {
                            return (
                              <Draggable
                                key={id}
                                draggableId={id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    <Board name={title} imgUrl={null} />
                                  </li>
                                )}
                              </Draggable>
                            );
                          })}
                      </ul>
                      {provided.placeholder}
                    </>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

BoardPage.getLayout = (page: ReactElement) => <BoardLayout>{page}</BoardLayout>;

export default BoardPage;
