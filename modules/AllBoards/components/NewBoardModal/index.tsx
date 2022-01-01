import Input from "../../../../components/Input";
import Modal, { ModalProps } from "../../../../components/Modal";

const NewBoardModal = ({ ...restProps }: ModalProps) => {
  return (
    <Modal {...restProps}>
      <form>
        <Input type="text" placeholder="Add board title" />
      </form>
    </Modal>
  );
};

export default NewBoardModal;
