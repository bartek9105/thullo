import { useGetBoards } from "../../hooks/useGetBoards";
import Board from "../../components/Board";
import Button from "../../components/Button";
import styles from "./AllBoards.module.scss";
import { useState } from "react";
import NewBoardModal from "./components/NewBoardModal";

const AllBoards = () => {
  const { boards } = useGetBoards();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>All Boards</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add</Button>
        </div>
        <div className={styles.boardsContainer}>
          {boards &&
            boards.map(({ id, name, img_url }) => (
              <Board key={id} name={name} imgUrl={img_url} />
            ))}
        </div>
      </div>
      <NewBoardModal isOpen={isModalOpen} />
    </>
  );
};

export default AllBoards;
