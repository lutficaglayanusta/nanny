import { Formik, Field, Form } from "formik";
import styles from "./ApplyForm.module.css";

const ApplyForm = ({ setIsOpen, product }) => {
  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    console.log(values);
    actions.resetForm();
    closeModalForm();
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.close} onClick={closeModalForm} aria-label="Close">
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
          email: "",
          name: "",
          message: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.row}>
            <Field
              type="text"
              name="address"
              placeholder="Address"
              className={styles.input}
            />
            <Field
              type="tel"
              name="tel"
              placeholder="+380"
              className={styles.input}
            />
          </div>

          <Field
            type="number"
            name="age"
            placeholder="Child's Age"
            className={styles.input}
          />

          <Field
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
          />

          <Field
            type="text"
            name="name"
            placeholder="Father's or mother's name"
            className={styles.input}
          />

          <Field
            as="textarea"
            name="message"
            rows="4"
            placeholder="Comment"
            className={`${styles.input} ${styles.textarea}`}
          />

          <button className={styles.submit} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ApplyForm;