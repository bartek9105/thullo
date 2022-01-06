import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Board from "../../components/Board";

const BoardPage = () => {
  const initial = [
    {
      id: "1",
      title: "Some content 1",
      imgUrl:
        "https://rfjqrkhhimfqveumwvig.supabase.co/storage/v1/object/public/images/public/photo-1615789591457-74a63395c990.jpeg",
    },
    {
      id: "2",
      title: "Some content 2",
      imgUrl:
        "https://rfjqrkhhimfqveumwvig.supabase.co/storage/v1/object/public/images/public/photo-1615789591457-74a63395c990.jpeg",
    },
  ];

  const [initialBoard, setInitialBoard] = useState(initial);

  const onDragEnd = () => {};

  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  return (
    <>
      {winReady && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <>
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {initialBoard.map(({ id, title, imgUrl }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <Board name={title} imgUrl={imgUrl} />
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
        </DragDropContext>
      )}
    </>
  );
};

export default BoardPage;
