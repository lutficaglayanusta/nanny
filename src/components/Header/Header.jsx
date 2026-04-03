import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(4px)",
    zIndex: 200,
  },
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [modalLogin, setmodalLogin] = useState(false);
  const [modalRegister, setmodalRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function openModalLogin() {
    setDrawerOpen(false);
    setmodalLogin(true);
  }

  function closeModalLogin() {
    setmodalLogin(false);
  }

  function openModalRegister() {
    setDrawerOpen(false);
    setmodalRegister(true);
  }

  function closeModalRegister() {
    setmodalRegister(false);
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setDrawerOpen(false);
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

          {/* Desktop navbar */}
          <nav className={styles.navbar}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/nannies">Nannies</Link></li>
              {user && (
                <li><Link to="/favorites">Favorites</Link></li>
              )}
            </ul>
            <ul>
              {user ? (
                <>
                  <p>{user.displayName}</p>
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
                    <button onClick={openModalRegister} className={styles.register}>
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Hamburger butonu (mobil) */}
          <button
            className={styles.hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Overlay */}
        {drawerOpen && (
          <div
            className={styles.overlay}
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Sağ drawer */}
        <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}>
          <button
            className={styles.drawerClose}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          <p className={styles.drawerLogo}>Nanny.Services</p>

          <nav className={styles.drawerNav}>
            <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
            <Link to="/nannies" onClick={() => setDrawerOpen(false)}>Nannies</Link>
            {user && (
              <Link to="/favorites" onClick={() => setDrawerOpen(false)}>Favorites</Link>
            )}
          </nav>

          <div className={styles.drawerActions}>
            {user ? (
              <>
                <p className={styles.drawerUsername}>{user.displayName}</p>
                <button onClick={handleLogOut} className={styles.register}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button onClick={openModalLogin} className={styles.login}>
                  Log In
                </button>
                <button onClick={openModalRegister} className={styles.register}>
                  Register
                </button>
              </>
            )}
          </div>
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