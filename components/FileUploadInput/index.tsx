import { InputHTMLAttributes } from "react";

import styles from "./FileUploadInput.module.scss";

type FileUploadInput = InputHTMLAttributes<HTMLInputElement>;

const FileUploadInput = ({ id, ...restProps }: FileUploadInput) => {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        Cover
      </label>
      <input type="file" id={id} {...restProps} className={styles.fileInput} />
    </>
  );
};

export default FileUploadInput;
