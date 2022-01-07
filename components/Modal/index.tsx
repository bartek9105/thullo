import { PropsWithChildren, useRef } from "react";
import styles from "./Modal.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import { modalAnimation } from "../../animations/modal.animation";
import { useClickOutside } from "../../hooks/useClickOutside";

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
}>;

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div {...modalAnimation}>
          <div className={styles.overlay} ref={modalRef} />
          <div className={styles.container}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
