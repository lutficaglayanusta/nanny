import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const RegisterForm = ({ setmodalRegister }) => {
  const closeModal = () => {
    setmodalRegister(false);
  };
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      await updateProfile(userCredential.user, {
        displayName: values.name,
      });
      navigate("/nannies");
      closeModal();
    } catch (error) {
      console.error("Giriş hatası:", error.message);
    }

    actions.resetForm();
  };

  return (
    <div className={styles.modalForm}>
      <h2>Registration</h2>
      <p className={styles.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
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
          <p onClick={closeModal} className={styles.close}>
            &#10006;
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
