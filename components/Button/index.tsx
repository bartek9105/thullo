import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import FeatherIcon from "feather-icons-react";
import cn from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName?: string;
  variant?: "blue" | "white" | "gray";
  active?: boolean;
};

const Button = ({
  iconName,
  variant = "blue",
  children,
  active = false,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      className={cn(styles.button, {
        [styles.blue]: variant === "blue",
        [styles.white]: variant === "white",
        [styles.gray]: variant === "gray",
      })}
    >
      {iconName && (
        <FeatherIcon icon={iconName} size={13} className={styles.icon} />
      )}
      {children}
    </button>
  );
};

export default Button;
