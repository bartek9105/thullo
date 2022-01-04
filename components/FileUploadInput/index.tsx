import { InputHTMLAttributes } from "react";
import FeatherIcon from "feather-icons-react";

import styles from "./FileUploadInput.module.scss";
import Image from "next/image";
import Button from "../Button";

type FileUploadInput = InputHTMLAttributes<HTMLInputElement> & {
  imgPreviewUrl: string;
};

const FileUploadInput = ({
  id,
  imgPreviewUrl,
  ...restProps
}: FileUploadInput) => {
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
