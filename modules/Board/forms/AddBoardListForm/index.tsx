import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import styles from "./AddBoardListForm.module.scss";

type AddBoardListFormValues = {
  listName: string;
};

type AddBoardListFormProps = {
  handleSubmit: (values: any) => void;
};

const AddBoardListForm = ({ handleSubmit }: AddBoardListFormProps) => {
  const initialValues: AddBoardListFormValues = { listName: "" };

  const validationSchema = yup.object({
    listName: yup.string().required("Please enter list name"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Field
            name="listName"
            type="text"
            placeholder="Enter list name"
            as={Input}
          />
          <div className={styles.buttonContainer}>
            <Button variant="gray" type="button">
              Cancel
            </Button>
            <Button type="submit" iconName="plus">
              Add
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddBoardListForm;
