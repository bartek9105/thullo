import { ReactElement, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BoardLayout from "../../../components/Layout/BoardLayout";
import ColumnDroppable from "../../../modules/Board/components/ColumnDroppable";
import styles from "./Board.module.scss";
import { useRouter } from "next/router";
import AddButton from "../../../modules/Board/components/AddButton";
import AddBoardListForm from "../../../modules/Board/forms/AddBoardListForm";
import ClientOnly from "../../../components/ClientOnly";
import { getBoardLists, postBoardList, postListCard } from "../../../api/lists";
import { useMutation, useQuery } from "react-query";
import NewCardModal from "../../../modules/Board/components/NewCardModal";

const BoardPage = () => {
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [activeList, setActiveList] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { query } = useRouter();
  const boardId = Number(query.id);

  const onDragEnd = () => {};

  const handleSubmit = async ({ listName }: any) => {
    await postNewList(listName);
  };

  const { mutateAsync: postNewList } = useMutation((data: any) =>
    postBoardList(data, boardId)
  );

  const { mutateAsync: postNewCard } = useMutation((data: any) =>
    postListCard(data, activeList)
  );

  const { data: boardLists } = useQuery(["boards", boardId], () =>
    getBoardLists(boardId)
  );

  const handleCardSubmit = async (cardData: any) => {
    await postNewCard(cardData);
    setIsModalOpen(false);
  };

  const lists = boardLists?.[0].lists;

  return (
    <ClientOnly>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.boardContainer}>
            {lists?.map(({ id, listName, cards }: any, index: number) => (
              <div className={styles.columnContainer} key={index}>
                <ColumnDroppable
                  key={index}
                  title={listName}
                  cardData={cards}
                  droppableId={`${id}`}
                  className={styles.column}
                />
                <AddButton
                  className={styles.button}
                  onClick={() => {
                    setIsModalOpen(true);
                    setActiveList(id);
                  }}
                >
                  Add new card
                </AddButton>
              </div>
            ))}
            <div className={styles.columnContainer}>
              {showNewListInput ? (
                <AddBoardListForm
                  handleSubmit={handleSubmit}
                  handleCancel={() => setShowNewListInput(false)}
                />
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
      <NewCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleSubmit={(values) => handleCardSubmit(values)}
      />
    </ClientOnly>
  );
};

BoardPage.getLayout = (page: ReactElement) => <BoardLayout>{page}</BoardLayout>;

export default BoardPage;
