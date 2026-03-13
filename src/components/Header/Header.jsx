import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
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
          </ul>
          <ul>
            <li>
              <button className={styles.login}>Log In</button>
            </li>
            <li>
              <button className={styles.register}>Register</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
