import Modal, { ModalProps } from "../../../../components/Modal";
import CreateBoardForm, {
  CreateBoardFormValues,
} from "../../forms/CreateBoardForm";
import styles from "./NewBoardModal.module.scss";

type NewBoardModalProps = ModalProps & {
  handleSubmit: (values: CreateBoardFormValues) => void;
  handleCancel: () => void;
  handleImageUpload: (image: File) => void;
  imagePreviewUrl: string;
  setImagePreviewUrl: (url: string) => void;
  setImageForUpload: (image: File) => void;
};

const NewBoardModal = ({
  handleSubmit,
  handleCancel,
  handleImageUpload,
  imagePreviewUrl,
  setImagePreviewUrl,
  setImageForUpload,
  ...restProps
}: NewBoardModalProps) => {
  return (
    <Modal {...restProps} onClose={handleCancel}>
      <div className={styles.container}>
        <CreateBoardForm
          handleSubmit={(values: CreateBoardFormValues) => {
            handleSubmit(values);
          }}
          handleCancel={handleCancel}
          imagePreviewUrl={imagePreviewUrl}
          setImagePreviewUrl={setImagePreviewUrl}
          setImageForUpload={setImageForUpload}
        />
      </div>
    </Modal>
  );
};

export default NewBoardModal;
