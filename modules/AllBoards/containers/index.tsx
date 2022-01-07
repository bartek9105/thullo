import { useGetBoards } from "../../../hooks/useGetBoards";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import styles from "./AllBoards.module.scss";
import { useState } from "react";
import NewBoardModal from "../components/NewBoardModal";
import { supabase } from "../../../utils/supabaseClient";
import { CreateBoardFormValues } from "../forms/CreateBoardForm";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { routes } from "../../../config/routes.config";

const AllBoards = () => {
  const { boards, fetchBoards } = useGetBoards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [imageForUpload, setImageForUpload] = useState<File | null>(null);

  const handleSubmit = async ({ title, isPrivate }: CreateBoardFormValues) => {
    let imagePublicUrl = "";

    if (imageForUpload) {
      imagePublicUrl = await handleImageUpload(imageForUpload);
    }

    await supabase
      .from("boards")
      .insert([{ title, img_url: imagePublicUrl, isPrivate }]);

    setIsModalOpen(false);

    await fetchBoards();
  };
  const handleImageUpload = async (image: File) => {
    const imageName = `${image.name}${uuid()}`;

    await supabase.storage.from("images").upload(`public/${imageName}`, image, {
      cacheControl: "3600",
      upsert: false,
    });

    setImageForUpload(null);
    setImagePreviewUrl("");

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${imageName}`;

    return publicUrl;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>All Boards</h1>
          <Button onClick={() => setIsModalOpen(true)} iconName="plus">
            Add
          </Button>
        </div>
        <div className={styles.boardsContainer}>
          {boards &&
            boards.map(({ id, title, img_url }) => (
              <Link href={routes.board.details(id)} key={id}>
                <a>
                  <Board key={id} title={title} imgUrl={img_url} />
                </a>
              </Link>
            ))}
        </div>
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
