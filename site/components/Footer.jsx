import styles from "../styles/Footer.module.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerWrapper}>
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
          className={styles.githubWrapper}
        >
          <FaGithub />
        </a>
      </div>
      <div className={styles.imgAttribution}>
        <a href="https://www.flaticon.com/free-icons/tu-tv" title="tu tv icons">
          Tu tv icons created by Freepik - Flaticon
        </a>
      </div>
    </footer>
  );
};

export default Footer;
