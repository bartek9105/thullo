import { PropsWithChildren } from "react";
import styles from "./Modal.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import { modalAnimation } from "../../animations/modal.animation";

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
}>;

const Modal = ({ isOpen, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div {...modalAnimation}>
          <div className={styles.overlay} />
          <div className={styles.container}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
