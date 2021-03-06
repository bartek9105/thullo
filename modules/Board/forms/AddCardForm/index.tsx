import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import styles from "./AddCardForm.module.scss";

type AddCardFormValues = {
  title: string;
};

type AddCardFormProps = {
  handleSubmit: (values: AddCardFormValues) => void;
};

const AddCardForm = ({ handleSubmit }: AddCardFormProps) => {
  const initialValues: AddCardFormValues = { title: "" };

  const validationSchema = yup.object({
    title: yup.string().required("Please enter a card name"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Field
            name="title"
            type="text"
            placeholder="Card title"
            as={Input}
            className={styles.input}
          />
          <Button type="submit">Add card</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCardForm;
