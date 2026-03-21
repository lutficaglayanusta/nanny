import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Modal from "react-modal";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const Header = () => {
  const [modalLogin, setmodalLogin] = useState(false);
  const [modalRegister, setmodalRegister] = useState(false);

  function openModalLogin() {
    setmodalLogin(true);
  }

  function closeModalLogin() {
    setmodalLogin(false);
  }

  function openModalRegister() {
    setmodalRegister(true);
  }

  function closeModalRegister() {
    setmodalRegister(false);
  }

  return (
    <>
      <header>
        <div className="container header-container">
          <p className={styles.logo}>Nanny.Services</p>
          <nav className={styles.navbar}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/nannies">Nannies</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
            <ul>
              <li>
                <button onClick={openModalLogin} className={styles.login}>
                  Log In
                </button>
              </li>
              <li>
                <button onClick={openModalRegister} className={styles.register}>
                  Register
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <Modal
          isOpen={modalRegister}
          onRequestClose={closeModalRegister}
          style={customStyles}
        >
          <RegisterForm setmodalRegister={setmodalRegister} />
        </Modal>

        <Modal
          isOpen={modalLogin}
          onRequestClose={closeModalLogin}
          style={customStyles}
        >
          <LoginForm setmodalLogin={setmodalLogin} />
        </Modal>
      </header>
    </>
  );
};

export default Header;
