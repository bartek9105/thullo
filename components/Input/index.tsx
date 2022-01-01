import { InputHTMLAttributes } from "react";
import FieldWrapper, { FieldWrapperProps } from "../FieldWrapper";
import styles from "./Input.module.scss";

type InputProps = FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, ...restProps }: InputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input {...restProps} className={styles.input} />
    </FieldWrapper>
  );
};

export default Input;
