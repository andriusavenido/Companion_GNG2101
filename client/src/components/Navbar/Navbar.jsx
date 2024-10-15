import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

// SVGs
import hamburger from "../../assets/svg/Hamburger_LG.svg";
import chat from "../../assets/svg/Chat.svg";
import create from "../../assets/svg/Note_Edit.svg";
import history from "../../assets/svg/Notebook.svg";
import info from "../../assets/svg/Info.svg";
import userIcon from "../../assets/svg/User_02.svg";
import planet from "../../assets/svg/Planet.svg";
import { ReactSVG } from "react-svg";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleBar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${isExpanded ? styles.navbarExpanded : styles.navbar} ${
        !isExpanded ? styles.closed : ""
      }`}
    >
      <div className={styles.navHeader}>
        <button className={styles.hamBtn} onClick={toggleBar}>
          <ReactSVG src={hamburger} className={styles.icon} />
          {isExpanded && <span>Rutgers Companion</span>}
        </button>
      </div>
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link to="/" className={styles.menuLink}>
              <ReactSVG src={chat} />
              {isExpanded && <span>Companion</span>}
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuLink}>
              <ReactSVG src={create} />
              {isExpanded && <span>Create New</span>}
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuLink}>
              <ReactSVG src={history} />
              {isExpanded && <span>History</span>}
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuLink}>
              <ReactSVG src={info} />
              {isExpanded && <span>Learn about Accessibility</span>}
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuLink}>
              <ReactSVG src={userIcon} />
              {isExpanded && <span>Login</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/about" className={`${styles.menuLink} ${styles.aboutLink}`}>
        <ReactSVG src={planet} />
        {isExpanded && <span>About Us</span>}
      </Link>
    </div>
  );
};

export default Navbar;