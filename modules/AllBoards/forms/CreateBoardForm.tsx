import { Field, Formik, Form } from "formik";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import * as yup from "yup";
import styles from "./CreateBoardForm.module.scss";
import FileUploadInput from "../../../components/FileUploadInput";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";
import { imageAnimation } from "../../../animations/image.animation";

export type CreateBoardFormValues = {
  title: string;
  isPrivate: boolean;
};

type CreateBoardFormProps = {
  handleSubmit: (values: CreateBoardFormValues) => void;
  handleCancel: () => void;
  imagePreviewUrl: string;
  setImagePreviewUrl: (url: string) => void;
  setImageForUpload: (image: File) => void;
};

const CreateBoardForm = ({
  handleSubmit,
  handleCancel,
  imagePreviewUrl,
  setImagePreviewUrl,
  setImageForUpload,
}: CreateBoardFormProps) => {
  const initialValues: CreateBoardFormValues = { title: "", isPrivate: false };

  return (
    <>
      {imagePreviewUrl && (
        <motion.div className={styles.imgPreviewContainer} {...imageAnimation}>
          <FeatherIcon
            icon="x"
            size={14}
            className={styles.closeIcon}
            onClick={() => setImagePreviewUrl("")}
          />
          <Image
            src={imagePreviewUrl}
            alt="boardImage"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 20%"
            className={styles.imgPreview}
          />
        </motion.div>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={yup.object({
          title: yup.string().required("Please enter board title"),
        })}
      >
        {({ setFieldValue, values: { isPrivate } }) => (
          <Form>
            <Field
              name="title"
              type="text"
              placeholder="Add board title"
              as={Input}
              className={styles.input}
            />
            <div className={styles.settingsButtonsContainer}>
              <Field
                name="img_url"
                onChange={(e: any) => {
                  const image = e.target.files[0];
                  setImageForUpload(image);
                  setImagePreviewUrl(URL.createObjectURL(image));
                }}
                id="img_url"
                as={FileUploadInput}
              />
              <Field
                name="isPrivate"
                as={Button}
                variant={isPrivate ? "blue" : "gray"}
                iconName="lock"
                type="button"
                active={isPrivate}
                onClick={() => setFieldValue("isPrivate", !isPrivate)}
              >
                Private
              </Field>
            </div>
            <div className={styles.actionButtonsContainer}>
              <Button
                variant="white"
                onClick={handleCancel}
                className={styles.button}
              >
                Cancel
              </Button>
              <Button type="submit" iconName="plus">
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateBoardForm;
