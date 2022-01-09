import Modal from "../../../../components/Modal";
import AddCardForm from "../../forms/AddCardForm";
import styles from "./NewCardModal.module.scss";

type NewCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (values: any) => void;
};

const NewCardModal = ({ isOpen, onClose, handleSubmit }: NewCardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <AddCardForm handleSubmit={(values) => handleSubmit(values)} />
      </div>
    </Modal>
  );
};

export default NewCardModal;
