import { Formik, Field, Form } from "formik";
import styles from "./LoginForm.module.css"

const LoginForm = ({ setmodalLogin }) => {
  
  const closeModal = () => {
    setmodalLogin(false)
  }


  const handleSubmit = (values, actions) => {
    console.log(values);

    actions.resetForm();
  };

  return (
    <div className={styles.modalForm}>
      <h2>Log In</h2>
      <p className={styles.description}>Welcome back! Please enter your credentials to access your account and continue your babysitter search.</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          
          <Field type="email" id="email" name="email" placeholder="Email" />

          <Field type="password" id="password" name="password" placeholder="Password" />

          <button type="submit">Log In</button>
          <p onClick={closeModal} className={styles.close}>&#10006;</p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
