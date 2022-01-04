import Modal, { ModalProps } from "../../../../components/Modal";
import CreateBoardForm from "../../forms/CreateBoardForm";
import styles from "./NewBoardModal.module.scss";

type NewBoardModalProps = ModalProps & {
  handleSubmit: (values: any) => void;
  handleCancel: () => void;
  handleImageUpload: (file: any) => void;
  imagePreview: any;
  setImagePreview: (value: boolean) => void;
  setImage: (image: any) => void;
};

const NewBoardModal = ({
  handleSubmit,
  handleCancel,
  handleImageUpload,
  imagePreview,
  setImagePreview,
  setImage,
  ...restProps
}: NewBoardModalProps) => {
  return (
    <Modal {...restProps}>
      <div className={styles.container}>
        <CreateBoardForm
          onSubmit={(values: any) => {
            handleSubmit(values);
          }}
          onCancel={handleCancel}
          onImageUpload={handleImageUpload}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setImage={setImage}
        />
      </div>
    </Modal>
  );
};

export default NewBoardModal;
