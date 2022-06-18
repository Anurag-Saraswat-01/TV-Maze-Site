import styles from "../styles/Footer.module.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        Created by{" "}
        <a
          href="https://anurag-saraswat-01.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Anurag Saraswat
        </a>
      </div>
      <a
        href="https://github.com/Anurag-Saraswat-01"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
    </footer>
  );
};

export default Footer;
