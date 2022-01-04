import { Field, Formik, Form } from "formik";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import * as yup from "yup";
import styles from "./CreateBoardForm.module.scss";
import FileUploadInput from "../../../components/FileUploadInput";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";

const CreateBoardForm = ({
  onSubmit,
  onCancel,
  onImageUpload,
  imagePreview,
  setImagePreview,
  setImage,
}: any) => {
  return (
    <>
      {imagePreview && (
        <motion.div
          className={styles.imgPreviewContainer}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <FeatherIcon
            icon="x"
            size={14}
            className={styles.closeIcon}
            onClick={() => setImagePreview(false)}
          />
          <Image
            src={imagePreview}
            alt="boardImage"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 20%"
            className={styles.imgPreview}
          />
        </motion.div>
      )}
      <Formik
        initialValues={{ name: "" }}
        onSubmit={onSubmit}
        validationSchema={yup.object({
          name: yup.string().required("Please enter board"),
        })}
      >
        {(formik) => (
          <Form>
            <Field
              name="name"
              type="text"
              placeholder="Add board title"
              as={Input}
              className={styles.input}
            />
            <div className={styles.settingsButtonsContainer}>
              <Field
                name="img_url"
                onChange={(e: any) => {
                  setImage(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                id="img_url"
                as={FileUploadInput}
                imgPreviewUrl={imagePreview}
                setImagePreview={setImagePreview}
              />
              <Button variant="gray" iconName="lock">
                Private
              </Button>
            </div>
            <div className={styles.actionButtonsContainer}>
              <Button
                variant="white"
                onClick={onCancel}
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
