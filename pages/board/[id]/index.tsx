import { ReactElement, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BoardLayout from "../../../components/Layout/BoardLayout";
import ColumnDroppable from "../../../modules/Board/components/ColumnDroppable";
import styles from "./Board.module.scss";
import { useRouter } from "next/router";
import AddButton from "../../../modules/Board/components/AddButton";
import AddBoardListForm from "../../../modules/Board/forms/AddBoardListForm";
import ClientOnly from "../../../components/ClientOnly";
import { getBoardLists, postBoardList } from "../../../api/lists";
import { useMutation, useQuery } from "react-query";

const BoardPage = () => {
  const [showNewListInput, setShowNewListInput] = useState(false);

  const { query } = useRouter();
  const boardId = Number(query.id);

  const onDragEnd = () => {};

  const handleSubmit = async ({ listName }: any) => {
    await postNewList(listName);
  };

  const { mutateAsync: postNewList } = useMutation((data: any) =>
    postBoardList(data, boardId)
  );

  const { data: boardLists } = useQuery(["boards", boardId], () =>
    getBoardLists(boardId)
  );

  const lists = boardLists?.[0].lists;

  return (
    <ClientOnly>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.boardContainer}>
            {lists &&
              lists.map(({ id, listName, cards }: any, index: number) => (
                <ColumnDroppable
                  key={index}
                  title={listName}
                  cardData={cards}
                  droppableId={`${id}`}
                />
              ))}
            <div style={{ height: "fit-content", width: 243 }}>
              {showNewListInput ? (
                <AddBoardListForm handleSubmit={handleSubmit} />
              ) : (
                <AddButton
                  className={styles.button}
                  onClick={() => setShowNewListInput(true)}
                >
                  Add new list
                </AddButton>
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
