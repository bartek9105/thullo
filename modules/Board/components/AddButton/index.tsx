import FeatherIcon from "feather-icons-react";
import { ButtonHTMLAttributes } from "react";
import styles from "./AddButton.module.scss";
import cn from "classnames";

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddButton = ({ className, children, ...restProps }: AddButtonProps) => {
  return (
    <button {...restProps} className={cn(className, styles.button)}>
      <>
        {children}
        <FeatherIcon icon="plus" size={13} className={styles.icon} />
      </>
    </button>
  );
};

export default AddButton;
