import Board from "../../../components/Board";
import Button from "../../../components/Button";
import styles from "./AllBoards.module.scss";
import { useState } from "react";
import NewBoardModal from "../components/NewBoardModal";
import { CreateBoardFormValues } from "../forms/CreateBoardForm";
import Link from "next/link";
import { routes } from "../../../config/routes.config";
import { useMutation, useQuery } from "react-query";
import {
  getBoards,
  postBoard,
  PostBoardConfig,
} from "../../../api/boards/boards.api";
import Loader from "../../../components/Loader";
import { uploadFile } from "../../../api/storage/storage.api";

const AllBoards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [imageForUpload, setImageForUpload] = useState<File | null>(null);

  const { data: boards, isLoading: isBoardsLoading } = useQuery(
    "boards",
    getBoards
  );

  const { mutateAsync: postNewBoard } = useMutation((data: PostBoardConfig) =>
    postBoard(data)
  );

  const handleSubmit = async ({ title, isPrivate }: CreateBoardFormValues) => {
    let imagePublicUrl = "";

    if (imageForUpload) {
      imagePublicUrl = await handleImageUpload(imageForUpload);
    }

    setIsModalOpen(false);

    await postNewBoard({ title, img_url: imagePublicUrl, isPrivate });
  };

  const handleImageUpload = async (image: File) => {
    const publicUrl = await uploadFile("images", image);

    setImageForUpload(null);
    setImagePreviewUrl("");

    return publicUrl;
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>All Boards</h1>
          <Button onClick={() => setIsModalOpen(true)} iconName="plus">
            Add
          </Button>
        </header>
        {isBoardsLoading && <Loader />}
        {boards && (
          <section className={styles.boardsContainer}>
            {boards.map(({ id, title, img_url }) => (
              <Link href={routes.board.details(id)} key={id}>
                <a>
                  <Board key={id} title={title} imgUrl={img_url} />
                </a>
              </Link>
            ))}
          </section>
        )}
      </div>
      <NewBoardModal
        isOpen={isModalOpen}
        handleSubmit={(values) => handleSubmit(values)}
        handleCancel={() => setIsModalOpen(false)}
        handleImageUpload={handleImageUpload}
        imagePreviewUrl={imagePreviewUrl}
        setImagePreviewUrl={setImagePreviewUrl}
        setImageForUpload={setImageForUpload}
      />
    </>
  );
};

export default AllBoards;
