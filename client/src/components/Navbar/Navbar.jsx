import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

// SVGs
import hamburger from "../../assets/svg/Hamburger_LG.svg";
import chat from "../../assets/svg/Chat.svg";
import create from "../../assets/svg/Note_Edit.svg";
import history from "../../assets/svg/Notebook.svg";
import info from "../../assets/svg/Info.svg";
import userIcon from "../../assets/svg/User_02.svg";
import planet from "../../assets/svg/Planet.svg";
import gear from "../../assets/svg/Settings.svg"
import { ReactSVG } from "react-svg";
import { useAuthContext } from "../../context/AuthContext";
import { useLoginSignup } from "../../hooks/useLoginSignup";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const {signout} = useLoginSignup();

  const toggleBar = () => {
    setIsExpanded(!isExpanded);
  };

  //fix this later
  const handleCreateNew = (e) =>{
    e.preventDefault();
    navigate("/");
    window.location.reload();
  }

  const handleSignOut = ()=>{
    signout();
    navigate("/");
  }

  return (
    <div
      className={`${isExpanded ? styles.navbarExpanded : styles.navbar} ${
        !isExpanded ? styles.closed : ""
      }`}
    >
      <div className={styles.navHeader}>
        <button className={styles.hamBtn} onClick={toggleBar}>
          <ReactSVG src={hamburger} className={styles.icon} />
          {isExpanded && <span>Companion Accessibility Tool</span>}
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
            <Link onClick={handleCreateNew} className={styles.menuLink}>
              <ReactSVG src={create} />
              {isExpanded && <span>Create New</span>}
            </Link>
          </li>
          <li>
            <Link to="/history" className={styles.menuLink}>
              <ReactSVG src={history} />
              {isExpanded && <span>History</span>}
            </Link>
          </li>
          <li>
            <Link to="/accessibility" className={styles.menuLink}>
              <ReactSVG src={info} />
              {isExpanded && <span>Learn about Accessibility</span>}
            </Link>
          </li>
          <li>
            <Link to="/options" className={styles.menuLink}>
              <ReactSVG src={gear} />
              {isExpanded && <span>Settings</span>}
            </Link>
          </li>
          <li>
            <Link to={user?"":"/login"} className={styles.menuLink}>
              <ReactSVG src={userIcon} />
              {isExpanded && <span>{user?user.username:"Login"}</span>}
            </Link>
          </li>
          {user &&isExpanded&&<li><Link onClick={handleSignOut} className={styles.menuLink}>
              <span>Sign Out</span>
            </Link>
             </li>}
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