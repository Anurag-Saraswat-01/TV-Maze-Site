import style from "../styles/Footer.module.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={style.footer}>
      Created by{" "}
      <a
        href="https://anurag-saraswat-01.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Anurag Saraswat
      </a>
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
