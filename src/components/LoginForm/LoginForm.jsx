import { Formik, Field, Form,ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; 
import toast from "react-hot-toast";
import * as Yup from 'yup';

 
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required(' Required'),
  password: Yup.string().required('Required'),
});

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
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/invalid-credential") { 
        return toast.error("Invalid email or password. Please try again.");
      }
      toast.error("Login failed. Please try again.");
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
        validationSchema={LoginFormSchema}

      >
        <Form>
          
          <Field type="email" id="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="span" className={styles.error} />

          <Field type="password" id="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="span" className={styles.error} />

          <button type="submit">Log In</button>
          <p onClick={closeModal} className={styles.close}>&#10006;</p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
