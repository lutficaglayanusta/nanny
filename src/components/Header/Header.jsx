import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

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
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [modalLogin, setmodalLogin] = useState(false);
  const [modalRegister, setmodalRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

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
              {user && (
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
              )}
            </ul>
            <ul>
              {user ? (
                <>
                  <p>
                    {user.displayName}
                  </p>
                <li>
                  <button onClick={handleLogOut} className={styles.register}>
                    Log Out
                  </button>
                </li>
                </>
                
              ) : (
                <>
                  <li>
                    <button onClick={openModalLogin} className={styles.login}>
                      Log In
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModalRegister}
                      className={styles.register}
                    >
                      Register
                    </button>
                  </li>
                </>
              )}
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
