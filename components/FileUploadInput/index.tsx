import { InputHTMLAttributes } from "react";

import styles from "./FileUploadInput.module.scss";

type FileUploadInput = InputHTMLAttributes<HTMLInputElement>;

const FileUploadInput = ({ id, ...restProps }: FileUploadInput) => {
  return (
    <>
      <label htmlFor={id} className={styles.test}>
        Cover
      </label>
      <input type="file" id={id} {...restProps} style={{ display: "none" }} />
    </>
  );
};

export default FileUploadInput;
