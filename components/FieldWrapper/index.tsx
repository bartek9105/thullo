import { PropsWithChildren } from "react";
import styles from "./FieldWrapper.module.scss";
import cn from "classnames";

export type FieldWrapperProps = PropsWithChildren<{
  label?: string;
  error?: any;
  className?: string;
}>;

const FieldWrapper = ({
  label,
  error,
  children,
  className,
}: FieldWrapperProps) => {
  return (
    <div className={cn(className, styles.container)}>
      {label && <label>{label}</label>}
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default FieldWrapper;
