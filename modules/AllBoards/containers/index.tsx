import { useGetBoards } from "../../../hooks/useGetBoards";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import styles from "./AllBoards.module.scss";
import { useState } from "react";
import NewBoardModal from "../components/NewBoardModal";
import { supabase } from "../../../utils/supabaseClient";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const AllBoards = () => {
  const { boards } = useGetBoards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

  const handleSubmit = async (values: any) => {
    const publicUrl = await handleImageUpload(image);

    await supabase
      .from("boards")
      .insert([{ name: values.name, img_url: publicUrl }]);

    setIsModalOpen(false);
  };

  const handleImageUpload = async (image: any) => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${image.name}`, image, {
        cacheControl: "3600",
        upsert: false,
      });

    const { publicURL } = await supabase.storage
      .from("images")
      .getPublicUrl(`public/${image.name}`);

    return publicURL;
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
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        setImage={setImage}
      />
    </>
  );
};

export default AllBoards;
