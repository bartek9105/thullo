import { Draggable } from "react-beautiful-dnd";
import Board from "../../../../components/Board";

type BoardDraggableProps = {
  id: number;
  title: string;
  imgUrl: string | null;
};

const BoardDraggable = ({ title, id }: BoardDraggableProps) => {
  return (
    <Draggable draggableId={`${id}`} index={1} key={id}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <div {...dragHandleProps} {...draggableProps} ref={innerRef}>
          <Board title={title} imgUrl={null} />
        </div>
      )}
    </Draggable>
  );
};

export default BoardDraggable;
