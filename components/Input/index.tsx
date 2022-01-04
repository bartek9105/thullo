import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import FieldWrapper, { FieldWrapperProps } from "../FieldWrapper";
import styles from "./Input.module.scss";

type InputProps = FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, className, ...restProps }: InputProps) => {
  const [field, meta] = useField(restProps);

  return (
    <FieldWrapper label={label} error={meta.error} className={className}>
      <input {...restProps} className={styles.input} />
    </FieldWrapper>
  );
};

export default Input;
