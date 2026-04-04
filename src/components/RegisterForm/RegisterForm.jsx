import { Formik, Field, Form,ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import toast from "react-hot-toast";
import * as Yup from 'yup';

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
});

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
      toast.success("Registration successful!");
    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        return toast.error("This email is already in use. Please try another one.");
      }
      if (error.code === "auth/invalid-email") {
        return toast.error("Invalid email format. Please enter a valid email.");
      }

      toast.error("Registration failed. Please try again.");
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
        validationSchema={RegisterFormSchema}
      >
        <Form>
          <Field type="text" id="name" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="span" className={styles.error} />

          <Field type="email" id="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="span" className={styles.error} />

          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="span" className={styles.error} />

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
