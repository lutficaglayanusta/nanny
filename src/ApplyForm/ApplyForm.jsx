import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./ApplyForm.module.css";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ApplyFormSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  tel: Yup.string().required("Required"),
  age: Yup.number()
    .required("Required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),
  email: Yup.string().email("Invalid email format").required("Required"),
  name: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

const ApplyForm = ({ setIsOpen, product }) => {
  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    toast.success("Your application has been sent successfully!");
    actions.resetForm();
    closeModalForm();
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.close}
        onClick={closeModalForm}
        aria-label="Close"
      >
        &#10006;
      </button>

      <h2 className={styles.title}>Make an appointment with a babysitter</h2>
      <p className={styles.text}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className={styles.info}>
        <img
          className={styles.avatar}
          src={product.avatar_url}
          width={44}
          height={44}
          alt=""
        />
        <div>
          <p className={styles.infoLabel}>Your nanny</p>
          <p className={styles.infoName}>{product.name}</p>
        </div>
      </div>

      <Formik
        initialValues={{
          address: "",
          tel: "",
          age: "",
          time: "09:00",
          email: "",
          name: "",
          message: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={ApplyFormSchema}
      >
        <Form className={styles.form}>
          <div className={styles.row}>
            <div>
              <Field
              type="text"
              name="address"
              placeholder="Address"
              className={styles.input}
            />
              <ErrorMessage name="address" component="span" className={styles.error} />
            </div>
            <div>
              <Field
              type="tel"
              name="tel"
              placeholder="+380"
              className={styles.input}
            />
            <ErrorMessage name="tel" component="span" className={styles.error} />
            </div>
            
          </div>
          <div className={styles.row}>
            <div>
              <Field
              type="number"
              name="age"
              placeholder="Child's Age"
              className={styles.input}
            />
            <ErrorMessage name="age" component="span" className={styles.error} />
            </div>
            
            <Field as="select" name="time" className={styles.input}>
              <option value="" disabled>
                Meeting time
              </option>
              {Array.from({ length: 13 }, (_, h) => h + 8).flatMap((h) =>
                ["00", "30"].map((m) => {
                  const t = `${String(h).padStart(2, "0")}:${m}`;
                  return (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  );
                }),
              )}
            </Field>
            <ErrorMessage name="time" component="span" className={styles.error} />
          </div>

          <Field
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
          />
          <ErrorMessage name="email" component="span" className={styles.error} />


          <Field
            type="text"
            name="name"
            placeholder="Father's or mother's name"
            className={styles.input}
          />
          <ErrorMessage name="name" component="span" className={styles.error} />
        

          <Field
            as="textarea"
            name="message"
            rows="4"
            placeholder="Comment"
            className={`${styles.input} ${styles.textarea}`}
          />
          <ErrorMessage name="message" component="span" className={styles.error} />
          

          <button className={styles.submit} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ApplyForm;
