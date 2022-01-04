import { useGetBoards } from "../../../hooks/useGetBoards";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import styles from "./AllBoards.module.scss";
import { useState } from "react";
import NewBoardModal from "../components/NewBoardModal";
import { supabase } from "../../../utils/supabaseClient";
import { CreateBoardFormValues } from "../forms/CreateBoardForm";
import { v4 as uuid } from "uuid";

const AllBoards = () => {
  const { boards } = useGetBoards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [imageForUpload, setImageForUpload] = useState<File | null>(null);

  const handleSubmit = async ({ name }: CreateBoardFormValues) => {
    let imagePublicUrl = "";

    if (imageForUpload) {
      imagePublicUrl = await handleImageUpload(imageForUpload);
    }

    await supabase.from("boards").insert([{ name, img_url: imagePublicUrl }]);

    setIsModalOpen(false);
  };
  const handleImageUpload = async (image: File) => {
    const imageName = `${image.name}${uuid()}`;

    await supabase.storage.from("images").upload(`public/${imageName}`, image, {
      cacheControl: "3600",
      upsert: false,
    });

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${image.name}`;

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
            boards.map(({ id, name, img_url }) => (
              <Board key={id} name={name} imgUrl={img_url} />
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
