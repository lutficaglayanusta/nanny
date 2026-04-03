import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; 

const LoginForm = ({ setmodalLogin }) => {
  
  const closeModal = () => {
    setmodalLogin(false)
  }
  const navigate = useNavigate();


  const handleSubmit = async (values, actions) => {
    

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate("/nannies");
      closeModal();
    } catch (error) {
      console.error("Giriş hatası:", error.message);
    }

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
