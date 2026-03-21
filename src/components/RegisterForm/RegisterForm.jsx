import { Formik, Field, Form } from "formik";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ setmodalRegister }) => {
  

  const closeModal = () => {
    setmodalRegister(false)
  }

  const handleSubmit = (values, actions) => {
    console.log(values);

    actions.resetForm();
  };

  return (
    <div className={styles.modalForm}>
      <h2>Registration</h2>
      <p className={styles.description}>
        Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" id="name" name="name" placeholder="Name" />

          <Field type="email" id="email" name="email" placeholder="Email" />

          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />

          <button type="submit">Sign Up</button>
          <p onClick={closeModal} className={styles.close}>&#10006;</p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
