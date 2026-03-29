import { Formik, Field, Form } from "formik";
import styles from "./ApplyForm.module.css";

const ApplyForm = ({ setIsOpen, product }) => {

  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    console.log(values);

    actions.resetForm();
  };

  return (
    <div className={styles.form}>
      <h2>Make an appointment with a babysitter</h2>
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
          <p>Your nanny</p>
          <p>{product.name}</p>
        </div>
      </div>

      <Formik
        initialValues={{
          address: "",
          tel: "",
          number: "",
          message: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={styles.contact}>
            <Field
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className={styles.address}
            />
            <Field
              type="tel"
              id="tel"
              name="tel"
              placeholder="+380"
              className={styles.tel}
            />
          </div>

          <div className={styles.contact}></div>

          <Field
            type="number"
            id="number"
            name="number"
            placeholder="Child's Age"
          />

          <Field className={styles.email} type="email" id="email" name="email" placeholder="Email" />

          <Field
            type="text"
            id="name"
                      name="name"
                      className={styles.name}
            placeholder="Father's or mother's name"
          />
          <Field className={styles.message} as="textarea" name="message" id="message" rows="5" cols="50" placeholder="Comment" />

          <button className={styles.submit} type="submit">
            Send
          </button>

          <p onClick={closeModalForm} className={styles.close}>
            &#10006;
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default ApplyForm;
