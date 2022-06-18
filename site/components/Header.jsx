import styles from "../styles/Header.module.css";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navTitle}>
        <Link href="/">IMDb but better</Link>
      </h1>
      <form className={styles.navForm} role="search">
        <input
          className={styles.searchBar}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <Link href="/search/brooklyn">
          <FaSearch color="white" size={20} />
        </Link>
      </form>
    </nav>
  );
};

export default Header;
