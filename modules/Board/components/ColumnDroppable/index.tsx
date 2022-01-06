import { Droppable } from "react-beautiful-dnd";
import BoardDraggable from "../BoardDraggable";
import Column, { ColumnProps } from "../Column";

type ColumnDroppableProps<T> = Omit<ColumnProps<T>, "renderCard"> & {
  droppableId: string;
};

const renderCard = (card: any) => {
  return <BoardDraggable {...card} />;
};

const ColumnDroppable = <T extends {}>({
  title,
  cardData,
  droppableId,
}: ColumnDroppableProps<T>) => {
  return (
    <Droppable droppableId={droppableId}>
      {({ droppableProps, innerRef, placeholder }) => (
        <>
          <div {...droppableProps} ref={innerRef}>
            <Column cardData={cardData} renderCard={renderCard} title={title} />
          </div>
          {placeholder}
        </>
      )}
    </Droppable>
  );
};

export default ColumnDroppable;
